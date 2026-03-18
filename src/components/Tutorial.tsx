"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "./Toast";

interface TutorialStep {
  title: string;
  content: string;
  highlight?: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: "Welcome to Activity Generator!",
    content: "This tool helps you discover fun activities for your free time. Let me show you around.",
  },
  {
    title: "Generate Ideas",
    content: "Click the 'Generate Idea' button to get a random activity suggestion from our curated list.",
  },
  {
    title: "Filter by Category",
    content: "Use the category buttons to filter activities. Click a category to see only that type of activity.",
  },
  {
    title: "View All Activities",
    content: "Click 'Show All Activities' to see a complete list organized by category.",
  },
  {
    title: "Save Favorites",
    content: "Click the heart icon to save activities you like to your personal 'My List' for quick access.",
  },
  {
    title: "Rate Activities",
    content: "Help us improve by rating activities with thumbs up or down. Your feedback makes recommendations better!",
  },
];

const STORAGE_KEY = "activity-generator-tutorial-progress";

export function Tutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // First visit - show tutorial automatically after a short delay
      setTimeout(() => setIsOpen(true), 500);
      setHasSeenTutorial(false);
    } else {
      const progress = JSON.parse(stored);
      setHasSeenTutorial(progress.completed || false);
      setCurrentStep(progress.step || 0);
    }
  }, []);

  const saveProgress = (step: number, completed: boolean = false) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ step, completed, timestamp: Date.now() })
    );
  };

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      saveProgress(newStep);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      saveProgress(newStep);
    }
  };

  const handleFinish = () => {
    setIsOpen(false);
    setHasSeenTutorial(true);
    saveProgress(TUTORIAL_STEPS.length - 1, true);
    showToast("Tutorial completed! Enjoy exploring activities.", "success");
  };

  const handleSkip = () => {
    setIsOpen(false);
    setHasSeenTutorial(true);
    saveProgress(0, true);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsOpen(true);
    setHasSeenTutorial(false);
    saveProgress(0);
  };

  // Don't show button if tutorial is completed
  if (hasSeenTutorial && !isOpen) {
    return (
      <Button
        onClick={handleRestart}
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-40"
        aria-label="Restart tutorial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Tutorial
      </Button>
    );
  }

  if (!isOpen && !hasSeenTutorial) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-40"
        aria-label="Start tutorial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Tutorial
      </Button>
    );
  }

  const step = TUTORIAL_STEPS[currentStep];
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-title"
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
        {/* Progress bar */}
        <div className="mb-4" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Step {currentStep + 1} of {TUTORIAL_STEPS.length}
          </p>
        </div>

        {/* Step content */}
        <h2 id="tutorial-title" className="text-xl font-bold mb-2">
          {step.title}
        </h2>
        <p className="text-gray-600 mb-6">{step.content}</p>

        {/* Navigation buttons */}
        <div className="flex justify-between gap-3">
          <Button variant="ghost" onClick={handleSkip} aria-label="Skip tutorial">
            Skip
          </Button>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" onClick={handlePrevious} aria-label="Previous step">
                Previous
              </Button>
            )}
            <Button onClick={handleNext} aria-label={currentStep === TUTORIAL_STEPS.length - 1 ? "Finish tutorial" : "Next step"}>
              {currentStep === TUTORIAL_STEPS.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
