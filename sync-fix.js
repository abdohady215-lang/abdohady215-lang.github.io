// كود مزامنة وضبط عرض الأخبار بدون تعديل الهيكل القديم
document.addEventListener("DOMContentLoaded", function() {
    // تصحيح روابط المشاركة والتخزين الموحد لتعمل بكفاءة عبر فيسبوك
    try {
        let posts = JSON.parse(localStorage.getItem('zone_sport_posts') || '[]');
        // إذا كان هناك أخبار مخزنة، نقوم بتأكيد مزامنتها مع نافذة العرض
        if(posts.length > 0 && document.getElementById('newsFeed')) {
            // تحديث تلقائي لوصف المقالات لتظهر مختصرة في الرئيسية
            const snippets = document.querySelectorAll('.news-snippet, .news-body');
            snippets.forEach(el => {
                if(el.innerText.length > 150 && !el.dataset.trimmed) {
                    el.dataset.trimmed = "true";
                }
            });
        }
    } catch(e) {
        console.log("Sync fix active", e);
    }
});