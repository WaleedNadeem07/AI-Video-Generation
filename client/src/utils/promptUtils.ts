/**
 * Cleans up markdown formatting from generated prompts to make them more readable
 * @param prompt - The raw prompt string with markdown formatting
 * @returns Cleaned prompt string without markdown formatting
 */
export const cleanPromptFormatting = (prompt: string): string => {
  return prompt
    // Remove markdown bold formatting (**text** becomes text)
    .replace(/\*\*(.*?)\*\*/g, '$1')
    // Remove markdown italic formatting (*text* becomes text)
    .replace(/\*(.*?)\*/g, '$1')
    // Remove markdown headers (# Header becomes Header)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove excessive line breaks (more than 2 consecutive)
    .replace(/\n{3,}/g, '\n\n')
    // Clean up any remaining markdown artifacts
    .replace(/^\*\s+/gm, '• ') // Convert * lists to bullet points
    .replace(/^-\s+/gm, '• ') // Convert - lists to bullet points
    .trim();
}; 