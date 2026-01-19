import React from 'react';
import { UserInfo } from '../types';
import { Button } from './Button';
import { BookOpen, School, GraduationCap, Book, PenTool } from 'lucide-react';

interface Props {
  userInfo: UserInfo;
  onChange: (field: keyof UserInfo, value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const SKKNForm: React.FC<Props> = ({ userInfo, onChange, onSubmit, isSubmitting }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name as keyof UserInfo, e.target.value);
  };

  const isFormValid = Object.values(userInfo).every(val => (val as string).trim() !== '');

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-teal-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-teal-800 mb-2">APP VIẾT SÁNG KIẾN CHO GIÁO VIÊN</h2>
        <p className="text-gray-500">Cung cấp thông tin cơ bản để AI Nguyễn Khắc Hưởng viết sáng kiến</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tên đề tài SK</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PenTool className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="topic"
              value={userInfo.topic}
              onChange={handleChange}
              className="bg-gray-50 focus:bg-white focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border transition-colors"
              placeholder="VD: Một số phương trình quy về phương trình bậc hai"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Môn học</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Book className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="subject"
                value={userInfo.subject}
                onChange={handleChange}
                className="bg-gray-50 focus:bg-white focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border transition-colors"
                placeholder="VD: Toán, Ngữ Văn"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Khối lớp / Cấp học</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <GraduationCap className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="grade"
                value={userInfo.grade}
                onChange={handleChange}
                className="bg-gray-50 focus:bg-white focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border transition-colors"
                placeholder="VD: Lớp 10, THPT"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trường công tác</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <School className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="school"
                value={userInfo.school}
                onChange={handleChange}
                className="bg-gray-50 focus:bg-white focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border transition-colors"
                placeholder="VD: THPT Quế Võ số 2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bộ sách giáo khoa</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="textbook"
                value={userInfo.textbook}
                onChange={handleChange}
                className="bg-gray-50 focus:bg-white focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-3 border transition-colors"
                placeholder="VD: KNTT"
              />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={onSubmit} 
            disabled={!isFormValid || isSubmitting} 
            isLoading={isSubmitting}
            className="w-full py-4 text-lg font-bold shadow-teal-500/30 shadow-lg"
          >
            Bắt đầu lập dàn ý chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};
