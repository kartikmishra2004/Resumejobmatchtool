import { useState } from 'react';
import { JobDescriptionInput } from './components/JobDescriptionInput';
import { ResumeUpload } from './components/ResumeUpload';
import { MatchResults } from './components/MatchResults';
import { Button } from './components/ui/button';
import { Sparkles, AlertCircle } from 'lucide-react';
import { extractTextFromPDF } from './services/pdfExtractor';
import { analyzeResumeMatch, type MatchResult } from './services/geminiService';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = async () => {
    if (!jobDescription || !resumeFile) {
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setMatchResult(null);
    
    try {
      // Extract text from PDF
      toast.info('Extracting text from resume...');
      const resumeText = await extractTextFromPDF(resumeFile);
      
      if (!resumeText || resumeText.trim().length < 50) {
        throw new Error('Could not extract sufficient text from the PDF. Please ensure the PDF contains readable text.');
      }

      // Analyze with Gemini AI
      toast.info('Analyzing with AI...');
      const result = await analyzeResumeMatch(jobDescription, resumeText);
      
      setMatchResult(result);
      toast.success('Analysis complete!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error during analysis:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const canMatch = jobDescription.trim().length > 0 && resumeFile !== null;

  return (
    <>
      <Toaster position="top-center" richColors />
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
            <p className="text-zinc-500 text-sm mt-2">
              Powered by Google Gemini AI
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

          {/* Error Message */}
          {error && (
            <div className="mb-8 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-400 font-semibold mb-1">Error</h3>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Results Section */}
          {matchResult && (
            <MatchResults result={matchResult} />
          )}
        </div>
      </div>
    </>
  );
}