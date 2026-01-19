
import React from 'react';
import { InitiativeRequest } from '../types';

interface InitiativeFormProps {
  onSubmit: (data: InitiativeRequest) => void;
  isLoading: boolean;
}

const InitiativeForm: React.FC<InitiativeFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<InitiativeRequest>({
    title: '',
    subject: '',
    grade: '',
    problem: '',
    solution: '',
    targetAudience: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
        <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
        Thông tin sáng kiến
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Môn học</label>
            <input 
              required
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="VD: Toán, Ngữ văn, Kỹ năng sống..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Khối lớp & Đối tượng</label>
            <input 
              required
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="VD: Khối 4, Học sinh THCS..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Tên sáng kiến (Dự kiến)</label>
          <input 
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="VD: Một số biện pháp giúp học sinh học tốt môn Toán lớp 3..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Vấn đề/Thực trạng cần giải quyết</label>
          <textarea 
            required
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            rows={4}
            placeholder="Mô tả ngắn gọn những khó khăn, hạn chế đang gặp phải..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Các giải pháp/biện pháp dự kiến</label>
          <textarea 
            required
            name="solution"
            value={formData.solution}
            onChange={handleChange}
            rows={4}
            placeholder="Liệt kê các ý tưởng hoặc phương pháp bạn muốn triển khai..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
          />
        </div>

        <button 
          disabled={isLoading}
          type="submit"
          className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center space-x-2 ${
            isLoading 
            ? 'bg-slate-400 cursor-not-allowed' 
            : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang xử lý ý tưởng...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Khởi tạo bản thảo Sáng kiến</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default InitiativeForm;
