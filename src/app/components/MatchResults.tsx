import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  GraduationCap, 
  Briefcase,
  Lightbulb,
  Target
} from 'lucide-react';
import type { MatchResult } from '../App';

interface MatchResultsProps {
  result: MatchResult;
}

export function MatchResults({ result }: MatchResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-500';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Overall Score */}
      <Card className="bg-zinc-900 border-zinc-800 p-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Target className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-zinc-100">Overall Match Score</h2>
          </div>
          <div className={`text-7xl font-bold mb-4 ${getScoreColor(result.overallScore)}`}>
            {result.overallScore}%
          </div>
          <div className="max-w-md mx-auto">
            <Progress 
              value={result.overallScore} 
              className="h-3 bg-zinc-800"
            />
          </div>
          <p className="text-zinc-400 mt-4">
            {result.overallScore >= 80 
              ? 'Excellent match! You are a strong candidate for this position.'
              : result.overallScore >= 60
              ? 'Good match! Consider highlighting relevant skills in your application.'
              : 'Moderate match. Review the recommendations to improve your fit.'}
          </p>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Matched Skills */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-semibold text-zinc-100">Matched Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.matchedSkills.map((skill, index) => (
              <Badge 
                key={index}
                className="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Missing Skills */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <XCircle className="w-5 h-5 text-red-400" />
            <h3 className="text-xl font-semibold text-zinc-100">Missing Skills</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills.map((skill, index) => (
              <Badge 
                key={index}
                className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Experience and Education Match */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="w-5 h-5 text-violet-400" />
            <h3 className="text-xl font-semibold text-zinc-100">Experience Match</h3>
          </div>
          <div className={`text-4xl font-bold mb-3 ${getScoreColor(result.experienceMatch.score)}`}>
            {result.experienceMatch.score}%
          </div>
          <Progress 
            value={result.experienceMatch.score} 
            className="h-2 bg-zinc-800 mb-4"
          />
          <p className="text-zinc-400 text-sm">{result.experienceMatch.details}</p>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5 text-fuchsia-400" />
            <h3 className="text-xl font-semibold text-zinc-100">Education Match</h3>
          </div>
          <div className={`text-4xl font-bold mb-3 ${getScoreColor(result.educationMatch.score)}`}>
            {result.educationMatch.score}%
          </div>
          <Progress 
            value={result.educationMatch.score} 
            className="h-2 bg-zinc-800 mb-4"
          />
          <p className="text-zinc-400 text-sm">{result.educationMatch.details}</p>
        </Card>
      </div>

      {/* Key Highlights */}
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-semibold text-zinc-100">Key Highlights</h3>
        </div>
        <ul className="space-y-2">
          {result.keyHighlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-2 text-zinc-300">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Recommendations */}
      <Card className="bg-zinc-900 border-zinc-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <h3 className="text-xl font-semibold text-zinc-100">Recommendations</h3>
        </div>
        <ul className="space-y-2">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-2 text-zinc-300">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <span>{recommendation}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
