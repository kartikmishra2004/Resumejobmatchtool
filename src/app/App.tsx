import { useState } from 'react';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { ResumeUpload } from './components/ResumeUpload';
import { MatchResults } from './components/MatchResults';
import { Button } from './components/ui/button';
import { Sparkles } from 'lucide-react';

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

export default function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleMatch = () => {
    if (!jobDescription || !resumeFile) {
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Mock matching logic
      const mockResult: MatchResult = {
        overallScore: Math.floor(Math.random() * 30) + 65, // 65-95
        matchedSkills: [
          'React.js',
          'TypeScript',
          'Node.js',
          'REST APIs',
          'Git',
          'Agile Methodology',
          'Problem Solving',
          'Team Collaboration'
        ],
        missingSkills: [
          'GraphQL',
          'Docker',
          'Kubernetes',
          'AWS Lambda'
        ],
        experienceMatch: {
          score: Math.floor(Math.random() * 25) + 70,
          details: 'Candidate has 3+ years of experience in full-stack development, aligning well with the 2-4 years requirement.'
        },
        educationMatch: {
          score: Math.floor(Math.random() * 20) + 75,
          details: 'Bachelor\'s degree in Computer Science meets the educational requirements.'
        },
        keyHighlights: [
          'Strong background in modern web development frameworks',
          'Proven track record in building scalable applications',
          'Experience with cross-functional team collaboration',
          'Demonstrated ability to deliver projects on time'
        ],
        recommendations: [
          'Consider learning GraphQL for modern API development',
          'Gain experience with containerization technologies (Docker, Kubernetes)',
          'Explore cloud platforms, particularly AWS services',
          'Highlight any leadership or mentoring experience'
        ]
      };

      setMatchResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const canMatch = jobDescription.trim().length > 0 && resumeFile !== null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-violet-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Resume Matcher AI
            </h1>
          </div>
          <p className="text-zinc-400 text-lg">
            Analyze how well your resume matches the job description
          </p>
        </div>

        {/* Input Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <JobDescriptionInput 
            value={jobDescription}
            onChange={setJobDescription}
          />
          <ResumeUpload 
            file={resumeFile}
            onFileChange={setResumeFile}
          />
        </div>

        {/* Match Button */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={handleMatch}
            disabled={!canMatch || isAnalyzing}
            size="lg"
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white px-12 py-6 text-lg font-semibold shadow-lg shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <span className="animate-spin mr-2">⚡</span>
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Match Resume
              </>
            )}
          </Button>
        </div>

        {/* Results Section */}
        {matchResult && (
          <MatchResults result={matchResult} />
        )}
      </div>
    </div>
  );
}
