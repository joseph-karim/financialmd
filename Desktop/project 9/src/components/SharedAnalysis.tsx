import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSharedAnalysis } from '../services/supabase';
import { Loader2, ExternalLink, AlertTriangle } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { usePackageStore } from '../store/packageStore';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export function SharedAnalysis() {
  const { shareId } = useParams<{ shareId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const store = useFormStore();
  const packageStore = usePackageStore();
  const [analysis, setAnalysis] = useState<any>(null);
  const [productInfo, setProductInfo] = useState<{
    productDescription: string;
    idealUser: any;
    selectedModel: string;
  }>({
    productDescription: '',
    idealUser: null,
    selectedModel: ''
  });

  useEffect(() => {
    const loadSharedAnalysis = async () => {
      if (!shareId) return;

      try {
        setLoading(true);
        console.log('Loading shared analysis with ID:', shareId);
        const sharedData = await getSharedAnalysis(shareId);
        
        if (!sharedData) {
          setError('This analysis could not be found or has been made private.');
          return;
        }
        
        console.log('Shared analysis loaded:', sharedData);
        
        // Set product info separately so we can show it in the view-only mode
        setProductInfo({
          productDescription: sharedData.product_description || '',
          idealUser: sharedData.ideal_user || null,
          selectedModel: sharedData.selected_model || ''
        });
        
        // Store the analysis results directly in our local state
        setAnalysis(sharedData.analysis_results || null);
        
        // Also update the store for compatibility with any components that might use it
        store.setProductDescription(sharedData.product_description);
        store.setIdealUser(sharedData.ideal_user);
        if (sharedData.outcomes && sharedData.outcomes.length > 0) {
          store.updateOutcome('beginner', sharedData.outcomes[0]?.text);
        }
        store.setSelectedModel(sharedData.selected_model);
        store.setAnalysis(sharedData.analysis_results);
        
        // Update package store if features are available
        if (sharedData.features) {
          packageStore.setFeatures(sharedData.features);
        }
        
      } catch (error) {
        console.error('Error loading shared analysis:', error);
        setError('This analysis is no longer available or has been made private.');
      } finally {
        setLoading(false);
      }
    };

    loadSharedAnalysis();
  }, [shareId, store, packageStore]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-[#FFD23F]" />
          <p className="text-gray-400">Loading shared analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <AlertTriangle className="w-8 h-8 mx-auto text-red-500" />
          <p className="text-red-400">{error || 'Analysis data is missing or incomplete.'}</p>
          <p className="text-gray-500">The shared analysis might have been deleted or made private by its owner.</p>
        </div>
      </div>
    );
  }

  // Now render our own view-only version of the analysis
  const { deepScore, componentScores, componentFeedback, strengths, weaknesses, summary } = analysis;

  const radarData = {
    labels: ['Desirability', 'Effectiveness', 'Efficiency', 'Polish'],
    datasets: [
      {
        label: 'Product Score',
        data: [
          deepScore.desirability,
          deepScore.effectiveness,
          deepScore.efficiency,
          deepScore.polish
        ],
        backgroundColor: 'rgba(255, 210, 63, 0.2)',
        borderColor: '#FFD23F',
        borderWidth: 2,
      },
      {
        label: 'Industry Benchmark',
        data: [7.1, 6.9, 6.7, 6.3],
        backgroundColor: 'rgba(156, 163, 175, 0.2)',
        borderColor: 'rgba(156, 163, 175, 1)',
        borderWidth: 2,
      }
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        grid: {
          color: '#333333',
        },
        angleLines: {
          color: '#333333',
        },
        pointLabels: {
          color: '#FFFFFF',
          font: { size: 11 }
        },
        ticks: {
          color: '#FFFFFF',
          backdropColor: '#1C1C1C',
          maxTicksLimit: 5,
          display: false
        },
        min: 0,
        max: 10
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',
          font: { size: 12 }
        },
      },
      tooltip: {
        backgroundColor: '#2A2A2A',
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: '#333333',
        borderWidth: 1,
      },
    },
    maintainAspectRatio: false
  };

  return (
    <div className="space-y-8">
      {/* Shared view header with watermark */}
      <div className="bg-[#2A2A2A] p-4 rounded-lg border border-[#444] mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">Shared Product Analysis</h1>
          <div className="text-xs text-gray-400 flex items-center">
            <span>Powered by ReviveAgent Insights</span>
            <ExternalLink className="w-3 h-3 ml-1" />
          </div>
        </div>
        <div className="mt-2 text-gray-300">
          <p><span className="font-medium">Product:</span> {productInfo.productDescription.substring(0, 100)}{productInfo.productDescription.length > 100 ? '...' : ''}</p>
          <p className="mt-1"><span className="font-medium">Model:</span> {productInfo.selectedModel?.replace('-', ' ') || 'Not specified'}</p>
        </div>
      </div>

      {/* Analysis content */}
      <div className="bg-[#2A2A2A] p-6 rounded-lg shadow-lg space-y-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Strategy Analysis</h2>
            <div className="mt-2 flex items-center">
              <span className="text-gray-400 mr-2">Overall Score:</span>
              <span className={`text-2xl font-bold ${
                deepScore.desirability >= 8 ? 'text-green-400' :
                deepScore.desirability >= 6 ? 'text-[#FFD23F]' :
                'text-red-400'
              }`}>
                {Math.round((
                  deepScore.desirability +
                  deepScore.effectiveness +
                  deepScore.efficiency +
                  deepScore.polish
                ) * 2.5)}/100
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Model Selected:</p>
            <p className="text-lg font-medium text-white capitalize">
              {productInfo.selectedModel?.replace('-', ' ')}
            </p>
            <p className="text-xs text-gray-400 mt-1">View Only Mode</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">DEEP Score Breakdown</h3>
            <div className="h-[300px] bg-[#1C1C1C] p-4 rounded-lg">
              <Radar data={radarData} options={chartOptions} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Executive Summary</h3>
            <div className="bg-[#1C1C1C] p-4 rounded-lg h-[300px] overflow-y-auto">
              <p className="text-gray-300 whitespace-pre-line">{summary}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1C1C1C] p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-3">Key Strengths</h4>
            <div className="space-y-2">
              {strengths.map((strength: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-1">✓</div>
                  <p className="text-gray-300">{strength}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1C1C1C] p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-white mb-3">Areas for Improvement</h4>
            <div className="space-y-2">
              {weaknesses.map((weakness: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-5 h-5 rounded-full bg-yellow-500 text-gray-900 flex items-center justify-center flex-shrink-0 mt-1">!</div>
                  <p className="text-gray-300">{weakness}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>This is a view-only version of a ReviveAgent Insights analysis shared with you.</p>
        <p className="mt-1">Create your own analysis by signing up at <a href="https://insights.reviveagent.com" className="text-[#FFD23F] hover:underline">insights.reviveagent.com</a></p>
      </div>
    </div>
  );
}