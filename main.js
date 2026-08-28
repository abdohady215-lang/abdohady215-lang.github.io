/**
 * Zone Sport - Main Professional Script (main.js)
 * المسؤول عن الميزات التفاعلية، إدارة التنبيهات، والتحسينات الاحترافية
 */

document.addEventListener('DOMContentLoaded', function() {
    // 1. تفعيل زر لوحة التحكم أوتوماتيكياً إذا كان المشرف مسجل دخول
    const adminBtn = document.getElementById('adminNavBtn');
    if (adminBtn && sessionStorage.getItem("is_admin_logged") === "true") {
        adminBtn.style.display = 'inline-block';
    }

    // 2. نظام الفحص الذكي وعرض الأخبار في الواجهة
    const feed = document.getElementById('newsFeed');
    if (feed) {
        let posts = [];
        try {
            posts = JSON.parse(localStorage.getItem('zone_sport_posts') || '[]');
        } catch(e) {
            posts = [];
        }

        if (posts.length === 0) {
            // فحص هل المستخدم داخل من متصفح فيسبوك الداخلي لتوجيهه بشكل ذكي
            const ua = navigator.userAgent || navigator.vendor || window.opera;
            const isFacebook = (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);

            if (isFacebook) {
                feed.innerHTML = `
                    <div class="empty-box" style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; background: rgba(255, 184, 0, 0.05); border: 2px dashed var(--brand-gold); border-radius: 12px;">
                        <h3 style="color: var(--brand-gold); font-size: 1.4rem; margin-bottom: 15px;">⚠️ تنبيه هام لزوار فيسبوك</h3>
                        <p style="margin-bottom: 25px; font-size: 1.05rem; line-height: 1.8; color: var(--text-muted);">متصفح فيسبوك الداخلي يمنع عرض الأخبار بشكل صحيح. يرجى الضغط على الزر أدناه لفتح الموقع في <strong>جوجل كروم</strong> الخارجي:</p>
                        <a href="${window.location.href}" target="_blank" class="action-btn" style="display: block; padding: 15px; font-size: 1.1rem; background: var(--brand-gold); color: #000; text-decoration: none; border-radius: 10px; font-weight: 900; box-shadow: 0 5px 15px rgba(255,184,0,0.3);">
                            🌐 افتح الموقع في متصفح كروم الآن
                        </a>
                    </div>
                `;
            } else {
                feed.innerHTML = '<div class="empty-box" style="grid-column: 1 / -1; text-align: center; padding: 50px; color: var(--text-muted); font-size: 1.1rem; background: var(--card-bg); border-radius: 12px; border: 1px solid var(--card-border);">لا توجد أخبار مضافة حتى الآن.</div>';
            }
            return;
        }

        // بناء كروت الأخبار بشكل شبكي تفاعلي واحترافي
        feed.innerHTML = '';
        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'news-card';
            
            let imgHtml = post.image ? `
                <div class="news-img-container">
                    <img src="${post.image}" class="news-img" alt="${post.title}">
                </div>
            ` : '';

            const articleUrl = `article.html?id=${post.id}`;
            let shortContent = post.content.length > 120 ? post.content.substring(0, 120) + "..." : post.content;

            card.innerHTML = `
                ${imgHtml}
                <div class="news-content">
                    <span class="news-date">📅 ${post.date}</span>
                    <h3 class="news-title">${post.title}</h3>
                    <div class="news-body">${shortContent}</div>
                    
                    <div class="card-actions">
                        <a href="${articleUrl}" class="action-btn">التفاصيل</a>
                        <button onclick="copyArticleLink('${window.location.origin + window.location.pathname.replace('index.html', '')}${articleUrl}', this)" class="action-btn">نسخ الرابط</button>
                    </div>
                </div>
            `;
            feed.appendChild(card);
        });
    }
});

// 3. وظيفة احترافية لنسخ رابط الخبر مع إظهار تأكيد مرئي للمستخدم
function copyArticleLink(url, btn) {
    navigator.clipboard.writeText(url).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ تم النسخ';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    }).catch(err => {
        alert('فشل نسخ الرابط');
    });
}