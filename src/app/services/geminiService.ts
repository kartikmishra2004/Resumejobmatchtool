import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'YOUR_API_KEY';

const genAI = new GoogleGenerativeAI(API_KEY);

export interface MatchResult {
  overallScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  experienceMatch: {
    score: number;
    details: string;
  };
  educationMatch: {
    score: number;
    details: string;
  };
  keyHighlights: string[];
  recommendations: string[];
}

export async function analyzeResumeMatch(
  jobDescription: string,
  resumeText: string
): Promise<MatchResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an expert HR analyst and recruitment specialist. Analyze how well the following resume matches the job description and provide a detailed assessment.

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resumeText}

Please analyze the match and provide a response in the following JSON format (respond ONLY with valid JSON, no additional text):
{
  "overallScore": <number between 0-100>,
  "matchedSkills": [<array of skills from resume that match job requirements>],
  "missingSkills": [<array of required skills from job description not found in resume>],
  "experienceMatch": {
    "score": <number between 0-100>,
    "details": "<brief explanation of experience match>"
  },
  "educationMatch": {
    "score": <number between 0-100>,
    "details": "<brief explanation of education match>"
  },
  "keyHighlights": [<array of 4-5 key strengths and positive points from the resume relevant to the job>],
  "recommendations": [<array of 4-5 specific recommendations to improve the match or application>]
}

Be thorough, specific, and constructive in your analysis. Ensure all scores are realistic based on the actual content comparison.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    let jsonText = text.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }
    
    const matchResult: MatchResult = JSON.parse(jsonText);
    
    return matchResult;
  } catch (error) {
    console.error('Error analyzing resume match:', error);
    throw new Error('Failed to analyze resume. Please try again.');
  }
}
