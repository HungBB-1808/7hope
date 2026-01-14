const envelopeStories = [
    { id: 1, title: "Tiền Vô Như Nước", color: "Đỏ Đậm", story: "Họa tiết sóng nước cuộn trào tượng trưng cho tài lộc dồi dào, chảy mãi không ngừng vào túi gia chủ." },
    { id: 2, title: "Ngựa Hồng May Mắn", color: "Hồng Phấn", story: "Chú ngựa hồng mang nụ cười tươi tắn, đại diện cho tình duyên phơi phới và niềm vui nhỏ bé mỗi ngày." },
    { id: 3, title: "Đại Cát Đại Lợi", color: "Đỏ Tươi", story: "Câu chúc kinh điển kết hợp với hình tượng ngựa thần tài, mang lại may mắn lớn trong công việc làm ăn." },
    { id: 4, title: "Vạn Sự Như Ý", color: "Xanh Dương", story: "Màu xanh của hy vọng và bình yên. Mọi dự định trong năm mới sẽ trôi chảy, thuận buồm xuôi gió." },
    { id: 5, title: "Túi Vàng Rủng Rỉnh", color: "Đỏ Cam", story: "Hình ảnh túi vàng căng tràn, lời chúc thực tế nhất cho một năm kinh tế vững vàng, tiêu xài không lo nghĩ." },
    { id: 6, title: "Ấm Áp Len Dệt", color: "Kem / Be", story: "Chất liệu len gợi nhớ sự sum vầy, ấm áp bên gia đình. Một cái Tết không chỉ giàu có mà còn đầy tình thân." }
];

const cardRotations = [-45, -25, -8, 8, 25, 45];
let selectedPackage = { quantity: 0, price: '' };
let activeCardId = null;

let isTicking = false;

window.addEventListener('scroll', () => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            const fanWrapper = document.getElementById('fanWrapper');
            if (window.scrollY > 100) {
                fanWrapper.classList.add('closed');
            } else {
                fanWrapper.classList.remove('closed');
            }
            isTicking = false;
        });
        isTicking = true;
    }
});

function openIOSModal(index) {
    const data = envelopeStories[index - 1];
    const cardElement = document.getElementById(`card-${index}`);
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    activeCardId = `card-${index}`;

    document.getElementById('modal-img').src = `weblixi/bao${index}.jpg`;
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-story').innerText = `"${data.story}"`;
    document.getElementById('modal-color').innerText = data.color;

    const cardRect = cardElement.getBoundingClientRect();
    modal.style.display = 'flex';
    const modalRect = modalContent.getBoundingClientRect();

    const cardCenter = { x: cardRect.left + cardRect.width / 2, y: cardRect.top + cardRect.height / 2 };
    const modalCenter = { x: modalRect.left + modalRect.width / 2, y: modalRect.top + modalRect.height / 2 };
    const translateX = cardCenter.x - modalCenter.x;
    const translateY = cardCenter.y - modalCenter.y;
    const scale = cardRect.width / modalRect.width;

    const isClosed = document.getElementById('fanWrapper').classList.contains('closed');
    const startRotation = isClosed ? 0 : cardRotations[index - 1];

    modalContent.style.transition = 'none';
    modalContent.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${startRotation}deg)`;
    modalContent.style.opacity = '1';

    modalContent.getBoundingClientRect();

    const anim = modalContent.animate([
        { transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${startRotation}deg)`, opacity: 1, borderRadius: '20px' },
        { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1, borderRadius: '24px' }
    ], { duration: 600, easing: 'cubic-bezier(0.19, 1, 0.22, 1)', fill: 'forwards' });

    anim.onfinish = () => { modalContent.style.transform = 'none'; modal.classList.add('visible'); };
}

function closeIOSModal() {
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    const cardElement = document.getElementById(activeCardId);
    if (!cardElement) { modal.style.display = 'none'; return; }

    modal.classList.remove('visible');

    const cardRect = cardElement.getBoundingClientRect();
    const modalRect = modalContent.getBoundingClientRect();
    const cardCenter = { x: cardRect.left + cardRect.width / 2, y: cardRect.top + cardRect.height / 2 };
    const modalCenter = { x: modalRect.left + modalRect.width / 2, y: modalRect.top + modalRect.height / 2 };
    const translateX = cardCenter.x - modalCenter.x;
    const translateY = cardCenter.y - modalCenter.y;
    const scale = cardRect.width / modalRect.width;

    const index = parseInt(activeCardId.split('-')[1]);
    const isClosed = document.getElementById('fanWrapper').classList.contains('closed');
    const endRotation = isClosed ? 0 : cardRotations[index - 1];

    const anim = modalContent.animate([
        { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1, borderRadius: '24px' },
        { transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${endRotation}deg)`, opacity: 0, borderRadius: '20px' }
    ], { duration: 500, easing: 'cubic-bezier(0.19, 1, 0.22, 1)', fill: 'forwards' });

    anim.onfinish = () => { modal.style.display = 'none'; activeCardId = null; };
}

const SHOP_INFO = { zalo: "0778617384", facebook: "61586564726732" };
function selectPackage(sets, priceStr) {
    selectedPackage = { quantity: sets, price: priceStr };
    const modal = document.getElementById('contactModal');
    document.getElementById('order-summary').innerHTML = `Bạn mua <strong>${sets} SET</strong> (${priceStr}đ)`;
    modal.style.display = 'flex';
}
function closeContactModal() { document.getElementById('contactModal').style.display = 'none'; }
function contactZalo() {
    const msg = `Shop ơi, mình đặt ${selectedPackage.quantity} SET (Giá: ${selectedPackage.price}đ).`;
    window.open(`https://zalo.me/${SHOP_INFO.zalo.replace(/^0/, '84')}?text=${encodeURIComponent(msg)}`, '_blank');
}
function contactFacebook() {
    const msg = `Shop ơi, mình đặt ${selectedPackage.quantity} SET (Giá: ${selectedPackage.price}đ).`;
    navigator.clipboard.writeText(msg).then(() => { alert("Đã copy đơn! Dán vào Messenger nhé."); window.open(`https://m.me/${SHOP_INFO.facebook}`, '_blank'); });
}
window.onclick = function (e) { if (e.target.id === 'contactModal') closeContactModal(); }