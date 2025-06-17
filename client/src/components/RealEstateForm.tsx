import React from 'react';

interface RealEstateFormData {
  propertyDetails: string;
  tourStyle: 'luxury' | 'family-friendly' | 'modern' | 'classic';
  focusAreas: string[];
  duration: 'short' | 'medium' | 'long';
}

interface RealEstateFormProps {
  formData: RealEstateFormData;
  setFormData: React.Dispatch<React.SetStateAction<RealEstateFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const RealEstateForm: React.FC<RealEstateFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  loading
}) => {
  // Handle when user clicks on or off a focus area checkbox
  const handleFocusAreaChange = (area: string) => {
    setFormData(prev => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter(a => a !== area)
        : [...prev.focusAreas, area]
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Real Estate Video Tour Generator</h3>
      
      {/* Text area for property details - pre-filled with a nice Beverly Hills listing */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Property Details
        </label>
        <textarea
          value={formData.propertyDetails}
          onChange={(e) => setFormData(prev => ({ ...prev, propertyDetails: e.target.value }))}
          placeholder="Property details will be pre-filled with the Beverly Hills listing"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          rows={4}
        />
      </div>

      {/* Two dropdown menus for tour style and duration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tour Style</label>
          <select
            value={formData.tourStyle}
            onChange={(e) => setFormData(prev => ({ ...prev, tourStyle: e.target.value as any }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="luxury">Luxury</option>
            <option value="family-friendly">Family-Friendly</option>
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
          <select
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value as any }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="short">Short (30-60 sec)</option>
            <option value="medium">Medium (1-2 min)</option>
            <option value="long">Long (2-3 min)</option>
          </select>
        </div>
      </div>

      {/* Grid of checkboxes for different areas of the property to focus on */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Focus Areas</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'exterior', label: 'Exterior' },
            { value: 'living-areas', label: 'Living Areas' },
            { value: 'kitchen', label: 'Kitchen' },
            { value: 'bedrooms', label: 'Bedrooms' },
            { value: 'bathrooms', label: 'Bathrooms' },
            { value: 'garage', label: 'Garage' },
            { value: 'landscaping', label: 'Landscaping' },
            { value: 'entrance', label: 'Entrance' }
          ].map(area => (
            <label key={area.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.focusAreas.includes(area.value)}
                onChange={() => handleFocusAreaChange(area.value)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{area.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit button - shows loading state when generating video */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Generating Property Tour...' : '🎥 Generate Property Tour Video'}
      </button>
    </form>
  );
};

export default RealEstateForm;
export type { RealEstateFormData }; 