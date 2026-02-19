export interface MusicRecommendation {
  title: string;
  artist: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  description?: string;
}

export interface TechRecommendation {
  name: string;
  url?: string;
  description?: string;
  category?: string;
}

export interface ParsedWeeklyPullRequest {
  postId: string;
  postTitle: string;
  publishDate: string;
  musicRecs: MusicRecommendation[];
  techRecs: TechRecommendation[];
  rawContent: string;
}

/**
 * Parses HTML content to extract text
 */
function stripHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts music recommendations from content
 */
function extractMusicRecommendations(content: string): MusicRecommendation[] {
  const musicRecs: MusicRecommendation[] = [];

  // Pattern 1: Look for sections with "Music" or "Riff" headers
  const musicSectionRegex = /(?:##?\s*(?:Music|Riff|Songs?|This Week'?s? (?:Music|Riff))[\s\S]*?)(?=##|$)/gi;
  const musicSections = content.match(musicSectionRegex) || [];

  musicSections.forEach(section => {
    // Pattern for Artist - Song Title or Song Title by Artist
    const patterns = [
      /(?:[-•*]\s*)?([^-\n]+?)\s*[-–—]\s*([^\n]+?)(?:\n|$)/g,
      /(?:[-•*]\s*)?([^\n]+?)\s+by\s+([^\n]+?)(?:\n|$)/gi,
      /\[([^\]]+)\]\(([^)]+)\)/g, // Markdown links
    ];

    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(section)) !== null) {
        const [, first, second] = match;

        if (first && second && first.length < 100 && second.length < 100) {
          // Determine if it's artist-title or title-artist
          const isArtistFirst = /^[A-Z]/.test(first.trim());

          const rec: MusicRecommendation = {
            title: isArtistFirst ? second.trim() : first.trim(),
            artist: isArtistFirst ? first.trim() : second.trim(),
          };

          // Check for Spotify/Apple Music URLs
          const urlMatch = section.match(/(?:spotify|music\.apple)\.com[^\s)]+/gi);
          if (urlMatch) {
            urlMatch.forEach(url => {
              if (url.includes('spotify')) rec.spotifyUrl = url;
              if (url.includes('apple')) rec.appleMusicUrl = url;
            });
          }

          musicRecs.push(rec);
        }
      }
    });
  });

  // Deduplicate by title + artist
  const uniqueRecs = musicRecs.filter((rec, index, self) =>
    index === self.findIndex((r) =>
      r.title.toLowerCase() === rec.title.toLowerCase() &&
      r.artist.toLowerCase() === rec.artist.toLowerCase()
    )
  );

  return uniqueRecs;
}

/**
 * Extracts tech recommendations from content
 */
function extractTechRecommendations(content: string): TechRecommendation[] {
  const techRecs: TechRecommendation[] = [];

  // Pattern: Look for sections with "Tech", "Code", "Tools", "Resources" headers
  const techSectionRegex = /(?:##?\s*(?:Tech|Code|Tools?|Resources?|Libraries?|Frameworks?|This Week'?s? (?:Tech|Code))[\s\S]*?)(?=##|$)/gi;
  const techSections = content.match(techSectionRegex) || [];

  techSections.forEach(section => {
    // Look for markdown links [Name](URL)
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = linkPattern.exec(section)) !== null) {
      const [, name, url] = match;

      if (name && url && name.length < 150) {
        // Try to find description (text after the link)
        const descPattern = new RegExp(`\\[${name}\\]\\([^)]+\\)\\s*[-–—:]?\\s*([^\\n]+)`, 'i');
        const descMatch = section.match(descPattern);

        techRecs.push({
          name: name.trim(),
          url: url.trim(),
          description: descMatch ? descMatch[1].trim() : undefined,
        });
      }
    });

    // Also look for bullet points with URLs
    const bulletPattern = /[-•*]\s*([^:\n]+?)(?::\s*([^\n]+?))?(?:\s*https?:\/\/([^\s)]+))?(?:\n|$)/g;
    while ((match = bulletPattern.exec(section)) !== null) {
      const [, name, desc, url] = match;

      if (name && name.length < 150) {
        techRecs.push({
          name: name.trim(),
          url: url ? `https://${url.trim()}` : undefined,
          description: desc ? desc.trim() : undefined,
        });
      }
    }
  });

  // Deduplicate by name
  const uniqueRecs = techRecs.filter((rec, index, self) =>
    index === self.findIndex((r) =>
      r.name.toLowerCase() === rec.name.toLowerCase()
    )
  );

  return uniqueRecs;
}

/**
 * Main parser function for Weekly Pull Request posts
 */
export function parseWeeklyPullRequest(post: any): ParsedWeeklyPullRequest | null {
  if (!post || !post.title || !post.title.toLowerCase().includes('weekly pull request')) {
    return null;
  }

  // Get content from various possible fields
  const rawContent = post.content_html || post.content || post.preview_text || '';
  const textContent = stripHtml(rawContent);

  return {
    postId: post.id,
    postTitle: post.title,
    publishDate: post.publish_date || post.created_at || '',
    musicRecs: extractMusicRecommendations(textContent),
    techRecs: extractTechRecommendations(textContent),
    rawContent: textContent,
  };
}

/**
 * Batch parse multiple posts
 */
export function parseMultipleWeeklyPullRequests(posts: any[]): ParsedWeeklyPullRequest[] {
  return posts
    .map(post => parseWeeklyPullRequest(post))
    .filter((parsed): parsed is ParsedWeeklyPullRequest => parsed !== null);
}

/**
 * Get all recommendations from multiple parsed posts
 */
export function aggregateRecommendations(parsedPosts: ParsedWeeklyPullRequest[]) {
  const allMusicRecs: MusicRecommendation[] = [];
  const allTechRecs: TechRecommendation[] = [];

  parsedPosts.forEach(post => {
    allMusicRecs.push(...post.musicRecs);
    allTechRecs.push(...post.techRecs);
  });

  return {
    music: allMusicRecs,
    tech: allTechRecs,
  };
}
