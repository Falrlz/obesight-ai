import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { Slider } from '@mui/material';

const sliderSx = {
  color: '#065f46',
  height: 6,
  '& .MuiSlider-thumb': {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    border: '2px solid #065f46',
    transition: 'box-shadow 0.15s ease-in-out',
    '&:hover, &.Mui-focusVisible': {
      boxShadow: '0px 0px 0px 8px rgba(6, 95, 70, 0.16)',
    },
    '&.Mui-active': {
      boxShadow: '0px 0px 0px 14px rgba(6, 95, 70, 0.24)',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#065f46',
  },
  '& .MuiSlider-rail': {
    opacity: 0.18,
    backgroundColor: '#065f46',
  },
};
const HEIGHT_MIN = 120;
const HEIGHT_MAX = 300;
const WEIGHT_MIN = 30;
const WEIGHT_MAX = 500;

export const Step1Basic: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleGenderSelect = (gender: 'Male' | 'Female') => {
    setFormData((prev) => ({ ...prev, Gender: gender }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData((prev) => ({ ...prev, name: cleanValue }));
  };

  const handleSliderChange = (field: 'Age' | 'Height' | 'Weight') => (
    _event: Event,
    value: number | number[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value as number }));
  };

  const isNameEmpty = formData.name.trim() === '';

  return (
    <div className="space-y-7 sm:space-y-8 animate-slideIn">
      {/* Name Input */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">Nama Panggilan</label>
        <input
          type="text"
          placeholder="Masukkan nama Anda..."
          value={formData.name}
          onChange={handleNameChange}
          className="w-full px-5 py-3.5 rounded-2xl bg-slate-50/50 border border-outline-variant focus:border-secondary focus:bg-white focus:outline-none transition-all duration-200 text-text-secondary text-lg"
        />
        {isNameEmpty && (
          <p className="text-sm font-medium text-rose-500">Nama wajib diisi</p>
        )}
      </div>

      {/* Gender Selection */}
      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-base sm:text-lg font-semibold text-text-secondary block">Jenis Kelamin</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleGenderSelect('Male')}
            className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer ${
              formData.Gender === 'Male'
                ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            <span className="text-sm font-medium">Laki-laki</span>
          </button>
          <button
            type="button"
            onClick={() => handleGenderSelect('Female')}
            className={`p-3.5 rounded-xl border text-center transition-all duration-200 active:scale-95 flex items-center justify-center cursor-pointer ${
              formData.Gender === 'Female'
                ? 'border-secondary bg-secondary/[0.03] text-secondary ring-1 ring-secondary shadow-sm'
                : 'border-outline-variant bg-white text-text-secondary hover:border-slate-300'
            }`}
          >
            <span className="text-sm font-medium">Perempuan</span>
          </button>
        </div>
      </div>

      {/* Age Input */}
      <div className="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4">
        <div className="flex justify-between items-center">
          <label className="text-base sm:text-lg font-semibold text-text-secondary">Umur</label>
          <span className="text-base font-bold text-text-secondary px-3.5 py-1 rounded-full bg-secondary/10 select-none">
            {formData.Age !== undefined && formData.Age !== null ? `${formData.Age} Tahun` : '- Tahun'}
          </span>
        </div>
        <Slider
          value={typeof formData.Age === 'number' ? formData.Age : 25}
          min={1}
          max={100}
          onChange={handleSliderChange('Age')}
          sx={sliderSx}
          className="py-4"
        />
      </div>

      {/* Height Slider */}
      <div className="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4">
        <div className="flex justify-between items-center">
          <label className="text-base sm:text-lg font-semibold text-text-secondary">Tinggi Badan</label>
          <span className="text-base font-bold text-text-secondary px-3.5 py-1 rounded-full bg-secondary/10 select-none">
            {formData.Height !== undefined && formData.Height !== null ? `${formData.Height} cm` : '- cm'}
          </span>
        </div>
        <Slider
          value={typeof formData.Height === 'number' ? formData.Height : 170}
          min={HEIGHT_MIN}
          max={HEIGHT_MAX}
          step={0.1}
          onChange={handleSliderChange('Height')}
          sx={sliderSx}
          className="py-4"
        />
      </div>

      {/* Weight Slider */}
      <div className="space-y-2.5 sm:space-y-3 pt-3 sm:pt-4">
        <div className="flex justify-between items-center">
          <label className="text-base sm:text-lg font-semibold text-text-secondary">Berat Badan</label>
          <span className="text-base font-bold text-text-secondary px-3.5 py-1 rounded-full bg-secondary/10 select-none">
            {formData.Weight !== undefined && formData.Weight !== null ? `${formData.Weight} kg` : '- kg'}
          </span>
        </div>
        <Slider
          value={typeof formData.Weight === 'number' ? formData.Weight : 70}
          min={WEIGHT_MIN}
          max={WEIGHT_MAX}
          step={0.1}
          onChange={handleSliderChange('Weight')}
          sx={sliderSx}
          className="py-4"
        />
      </div>
    </div>
  );
};
export default Step1Basic;
