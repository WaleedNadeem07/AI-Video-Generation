import React from 'react';

interface SuplimaxFormData {
  productFeatures: string;
  tone: 'energetic' | 'professional' | 'casual' | 'luxury';
  targetAudience: 'young-adults' | 'athletes' | 'professionals' | 'students';
  videoStyle: 'dynamic' | 'elegant' | 'sporty' | 'modern';
}

interface SuplimaxFormProps {
  formData: SuplimaxFormData;
  setFormData: React.Dispatch<React.SetStateAction<SuplimaxFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const SuplimaxForm: React.FC<SuplimaxFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  loading
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Suplimax Energy Drink Marketing Video</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key Product Features *
        </label>
        <textarea
          value={formData.productFeatures}
          onChange={(e) => setFormData(prev => ({ ...prev, productFeatures: e.target.value }))}
          placeholder="Describe the key features of Suplimax energy drink (e.g., natural ingredients, long-lasting energy, great taste, etc.)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tone</label>
          <select
            value={formData.tone}
            onChange={(e) => setFormData(prev => ({ ...prev, tone: e.target.value as any }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="energetic">Energetic</option>
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
          <select
            value={formData.targetAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value as any }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="young-adults">Young Adults (18-25)</option>
            <option value="athletes">Athletes</option>
            <option value="professionals">Professionals</option>
            <option value="students">Students</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Video Style</label>
          <select
            value={formData.videoStyle}
            onChange={(e) => setFormData(prev => ({ ...prev, videoStyle: e.target.value as any }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="dynamic">Dynamic</option>
            <option value="elegant">Elegant</option>
            <option value="sporty">Sporty</option>
            <option value="modern">Modern</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Generating Suplimax Video...' : '🎥 Generate Suplimax Marketing Video'}
      </button>
    </form>
  );
};

export default SuplimaxForm;
export type { SuplimaxFormData }; 