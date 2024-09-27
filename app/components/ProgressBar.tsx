const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="relative w-full h-2 bg-gray-200 rounded">
      <div
        className="absolute h-full bg-airbnb"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar