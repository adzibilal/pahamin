interface ProgressCardProps {
  title: string;
  value: number;
  maxValue?: number;
  unit?: string;
  icon: string;
  color: 'primary' | 'secondary' | 'success' | 'warning';
  description?: string;
}

export default function ProgressCard({ 
  title, 
  value, 
  maxValue, 
  unit, 
  icon, 
  color, 
  description 
}: ProgressCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'text-primary bg-primary/10';
      case 'secondary':
        return 'text-secondary bg-secondary/10';
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const percentage = maxValue ? Math.round((value / maxValue) * 100) : null;

  return (
    <div className="bg-surface rounded-2xl p-6 shadow-medium">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            {description && (
              <p className="text-sm text-text-secondary">{description}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-text-primary">
            {value}{unit && ` ${unit}`}
          </div>
          {percentage !== null && (
            <div className="text-sm text-text-secondary">{percentage}%</div>
          )}
        </div>
      </div>
      
      {percentage !== null && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getColorClasses(color)}`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  );
} 