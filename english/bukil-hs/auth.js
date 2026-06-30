// =============================================
// 더 프라임 워크북 · 공통 인증 모듈
// =============================================

const _SB_URL  = 'https://fqluoiryrahunnjatrsv.supabase.co';
const _SB_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxbHVvaXJ5cmFodW5uamF0cnN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4MDA4MTMsImV4cCI6MjA5ODM3NjgxM30.2q2xjdhJXCGEuGNDkFEVx3E6HwV1Jxg3uaxhfCsBgK4';

window._sb        = supabase.createClient(_SB_URL, _SB_KEY);
window._studentId = null;
window._PID       = window._PID || 'unknown';

(async () => {
  const { data: { session } } = await window._sb.auth.getSession();
  if (!session) {
    window.location.href = '../../login.html';
    return;
  }
  window._studentId = session.user.id;
})();

async function saveProgress(questionId, isCorrect) {
  if (!window._studentId) return;
  try {
    await window._sb.from('progress').insert({
      student_id: window._studentId,
      passage:    window._PID,
      question_id: questionId,
      is_correct:  isCorrect
    });
  } catch(e) { /* 저장 실패는 조용히 무시 */ }
}
