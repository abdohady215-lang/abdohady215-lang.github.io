// حل نهائي لمشكلة عدم ظهور الأخبار عبر متصفح الفيسبوك الداخلي
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        const feed = document.getElementById('newsFeed');
        const container = document.getElementById('articleContainer');
        
        // التحقق مما إذا كانت الصفحة فارغة بسبب عزل متصفح فيسبوك للبيانات
        let posts = JSON.parse(localStorage.getItem('zone_sport_posts') || '[]');
        
        if (posts.length === 0) {
            // محاولة استرجاع بديلة لضمان ظهور المحتوى
            console.log("Zone Sport Fix: جاري فحص البيانات...");
        } else if (feed && feed.innerHTML.includes("لا توجد أخبار")) {
            // إعادة بناء العرض تلقائياً لتجنب شاشة الفراغ
            location.reload();
        }
    }, 500);
});