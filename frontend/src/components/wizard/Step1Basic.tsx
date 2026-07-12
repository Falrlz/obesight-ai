import React from 'react';
import { useFormContext } from '../../context/FormContext';
import { Slider } from '@mui/material';

const sliderSx = {
  color: '#065f46',
  height: 6,
  '& .MuiSlider-thumb': {
    width: 18,
    height: 18,
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

export const Step1Basic: React.FC = () => {
  const { formData, setFormData } = useFormContext();

  const handleGenderSelect = (gender: 'Male' | 'Female') => {
    setFormData((prev) => ({ ...prev, Gender: gender }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleSliderChange = (field: 'Age' | 'Height' | 'Weight') => (
    _event: Event,
    value: number | number[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value as number }));
  };

  const isNameEmpty = formData.name.trim() === '';

  return (
    <div className="space-y-6 animate-slideIn">
      <div>
        <h2 className="text-xl font-bold text-on-surface">1. Data Dasar & Fisik</h2>
        <p className="text-sm text-text-secondary mt-1">
          Masukkan informasi profil dasar dan ukuran antropometri tubuh Anda.
        </p>
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">Nama Panggilan</label>
        <input
          type="text"
          placeholder="Masukkan nama Anda..."
          value={formData.name}
          onChange={handleNameChange}
          className="w-full px-4 py-3 rounded-2xl bg-slate-50/50 border border-outline-variant focus:border-secondary focus:bg-white focus:outline-none transition-all duration-200"
        />
        {isNameEmpty && (
          <p className="text-xs text-rose-500 font-medium">Nama wajib diisi</p>
        )}
      </div>

      {/* Gender Selection */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 block">Jenis Kelamin</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleGenderSelect('Male')}
            className={`p-4 rounded-2xl border text-center transition-all duration-300 active:scale-95 flex flex-col items-center justify-center gap-2 cursor-pointer ${
              formData.Gender === 'Male'
                ? 'border-secondary bg-secondary/5 text-secondary shadow-md ring-1 ring-secondary'
                : 'border-outline-variant bg-white text-slate-500 hover:border-slate-300'
            }`}
          >
            <span className="text-3xl">👨</span>
            <span className="text-sm font-bold">Laki-laki</span>
          </button>
          <button
            type="button"
            onClick={() => handleGenderSelect('Female')}
            className={`p-4 rounded-2xl border text-center transition-all duration-300 active:scale-95 flex flex-col items-center justify-center gap-2 cursor-pointer ${
              formData.Gender === 'Female'
                ? 'border-secondary bg-secondary/5 text-secondary shadow-md ring-1 ring-secondary'
                : 'border-outline-variant bg-white text-slate-500 hover:border-slate-300'
            }`}
          >
            <span className="text-3xl">👩</span>
            <span className="text-sm font-bold">Perempuan</span>
          </button>
        </div>
      </div>

      {/* Age Input */}
      <div className="space-y-2 pt-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700">Umur</label>
          <span className="text-sm font-bold text-secondary px-3 py-1 rounded-full bg-secondary/10">
            {formData.Age} Tahun
          </span>
        </div>
        <Slider
          value={formData.Age}
          min={1}
          max={100}
          onChange={handleSliderChange('Age')}
          sx={sliderSx}
          className="py-4"
        />
      </div>

      {/* Height Slider */}
      <div className="space-y-2 pt-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700">Tinggi Badan</label>
          <span className="text-sm font-bold text-secondary px-3 py-1 rounded-full bg-secondary/10">
            {formData.Height} cm
          </span>
        </div>
        <Slider
          value={formData.Height}
          min={100}
          max={220}
          onChange={handleSliderChange('Height')}
          sx={sliderSx}
          className="py-4"
        />
      </div>

      {/* Weight Slider */}
      <div className="space-y-2 pt-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700">Berat Badan</label>
          <span className="text-sm font-bold text-secondary px-3 py-1 rounded-full bg-secondary/10">
            {formData.Weight} kg
          </span>
        </div>
        <Slider
          value={formData.Weight}
          min={30}
          max={200}
          onChange={handleSliderChange('Weight')}
          sx={sliderSx}
          className="py-4"
        />
      </div>
    </div>
  );
};
export default Step1Basic;
