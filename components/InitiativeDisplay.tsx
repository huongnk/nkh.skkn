
import React from 'react';
import { InitiativeResponse } from '../types';

interface InitiativeDisplayProps {
  data: InitiativeResponse;
}

const InitiativeDisplay: React.FC<InitiativeDisplayProps> = ({ data }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden mb-12">
      <div className="bg-slate-50 border-b border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 text-emerald-600 font-bold">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Đã hoàn thành bản thảo!</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrint}
            className="flex items-center space-x-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors font-semibold shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>In / Lưu PDF</span>
          </button>
        </div>
      </div>

      <div className="p-8 sm:p-12 print:p-0 serif max-w-4xl mx-auto space-y-10 leading-relaxed text-slate-800 printable-area">
        <header className="text-center space-y-6 mb-16">
          <div className="space-y-1">
            <h3 className="uppercase font-bold text-lg tracking-widest">Cộng hòa xã hội chủ nghĩa Việt Nam</h3>
            <p className="underline underline-offset-8 font-medium italic">Độc lập - Tự do - Hạnh phúc</p>
          </div>
          <div className="pt-12">
            <h2 className="text-3xl font-bold uppercase leading-tight text-slate-900">Sáng kiến kinh nghiệm</h2>
            <h1 className="text-2xl mt-4 font-bold text-indigo-900 border-y-2 border-slate-900 py-4 max-w-2xl mx-auto uppercase">
              {data.title}
            </h1>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase text-slate-900 flex items-center">
            <span className="w-8">I.</span> Lý do chọn đề tài
          </h2>
          <div className="whitespace-pre-line text-justify pl-8 italic border-l-2 border-slate-100">
            {data.rationale}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase text-slate-900 flex items-center">
            <span className="w-8">II.</span> Mục tiêu và nhiệm vụ nghiên cứu
          </h2>
          <div className="whitespace-pre-line text-justify pl-8">
            {data.objectives}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase text-slate-900 flex items-center">
            <span className="w-8">III.</span> Thực trạng của vấn đề
          </h2>
          <div className="whitespace-pre-line text-justify pl-8">
            {data.practicalState}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-xl font-bold uppercase text-slate-900 flex items-center">
            <span className="w-8">IV.</span> Các biện pháp thực hiện
          </h2>
          <div className="space-y-8 pl-8">
            {data.solutions.map((sol, index) => (
              <div key={index} className="space-y-3">
                <h3 className="font-bold text-lg text-indigo-800">
                  {index + 1}. {sol.title}
                </h3>
                <div className="whitespace-pre-line text-justify text-slate-700">
                  {sol.content}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase text-slate-900 flex items-center">
            <span className="w-8">V.</span> Hiệu quả của sáng kiến
          </h2>
          <div className="whitespace-pre-line text-justify pl-8">
            {data.results}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase text-slate-900 flex items-center">
            <span className="w-8">VI.</span> Kết luận và kiến nghị
          </h2>
          <div className="whitespace-pre-line text-justify pl-8">
            {data.conclusion}
          </div>
        </section>

        <footer className="pt-24 grid grid-cols-2 gap-12 text-center italic">
          <div className="space-y-1">
            <p className="font-bold not-italic">Xác nhận của nhà trường</p>
            <p className="text-sm">(Ký tên, đóng dấu)</p>
          </div>
          <div className="space-y-1">
            <p>....., ngày ... tháng ... năm 202...</p>
            <p className="font-bold not-italic">Người thực hiện</p>
            <p className="text-sm">(Ký và ghi rõ họ tên)</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default InitiativeDisplay;
