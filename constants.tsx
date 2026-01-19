
import { SKKNSection } from './types';

export const DEFAULT_SECTIONS: SKKNSection[] = [
  {
    id: 'rationale',
    title: '1. Lý do chọn đề tài',
    placeholder: 'Nêu rõ tính cấp thiết, thực trạng và lý do bạn chọn đề tài này...',
    content: ''
  },
  {
    id: 'objectives',
    title: '2. Mục tiêu nghiên cứu',
    placeholder: 'Đề tài này nhằm giải quyết vấn đề gì? Đạt được kết quả gì?',
    content: ''
  },
  {
    id: 'methods',
    title: '3. Các giải pháp thực hiện',
    placeholder: 'Mô tả chi tiết các bước, phương pháp, kỹ thuật bạn đã áp dụng...',
    content: ''
  },
  {
    id: 'results',
    title: '4. Hiệu quả áp dụng',
    placeholder: 'Số liệu so sánh trước và sau khi áp dụng giải pháp...',
    content: ''
  },
  {
    id: 'conclusion',
    title: '5. Kết luận và kiến nghị',
    placeholder: 'Tóm tắt bài học kinh nghiệm và các đề xuất với cấp trên...',
    content: ''
  }
];

export const SUBJECTS = [
  'Toán học', 'Ngữ văn', 'Tiếng Anh', 'Vật lý', 'Hóa học', 'Sinh học', 
  'Lịch sử', 'Địa lý', 'GDKT-PL', 'Tin học', 'Công nghệ', 'Âm nhạc', 'Mỹ thuật', 'Thể dục', 'Tiểu học (Tổng hợp)', 'Mầm non'
];

export const GRADES = [
  'Mầm non', 'Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5', 
  'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Lớp 11', 'Lớp 12'
];
