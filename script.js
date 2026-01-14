const envelopeStories = [
    { id: 1, title: "Tiền Vô Như Nước", color: "Đỏ Đậm", story: "Mở bát cho một năm mới tài lộc dồi dào với chú ngựa thêu sắc sảo trên nền đỏ truyền thống. Điểm nhấn là lời chúc 'Tiền Vô Như Nước' - món quà tinh thần không thể thiếu dành tặng đối tác và người thân để cầu chúc một năm tài chính thịnh vượng, tiền vào không ngừng nghỉ." },
    { id: 2, title: "Ngựa Hồng May Mắn", color: "Hồng Phấn", story: "Một thiết kế 'đốn tim' các bạn nhỏ và những cô nàng yêu thích sự ngọt ngào. Chất liệu lông nhung mềm mượt bao phủ lấy chú ngựa nhỏ xinh, mang đến cảm giác cao cấp và khác biệt hoàn toàn so với bao giấy thông thường. Đây chính là tấm vé mang niềm vui và sự ấm áp đến mọi nhà." },
    { id: 3, title: "Đại Cát Đại Lợi", color: "Đỏ Tươi", story: "Chú ngựa trắng thêu nổi bật giữa những áng mây và chữ 'Phúc', 'Lộc' cổ điển. Mẫu bao lì xì này toát lên vẻ sang trọng, mang ý nghĩa mọi việc đều suôn sẻ, gặp dữ hóa lành, đón nhận đại cát đại lợi. Một lựa chọn tinh tế để thay lời chúc bình an." },
    { id: 4, title: "Vạn Sự Như Ý", color: "Xanh Dương", story: "Sự kết hợp phá cách giữa chú ngựa hồng và nền lông xanh pastel tạo nên một tổng thể vô cùng hiện đại và bắt mắt. 'Vạn Sự Như Ý' không chỉ là lời chúc, mà còn là mong ước cho một năm mới tràn đầy hy vọng và những khởi đầu mới mẻ, thành công rực rỡ." },
    { id: 5, title: "Túi Vàng Rủng Rỉnh", color: "Đỏ Cam", story: "Hình ảnh chú ngựa khỏe khoắn thồ trên lưng túi tiền vàng trĩu nặng là biểu tượng của sự no đủ. Mẫu bao lì xì này như một lời hứa hẹn về một năm mới gặt hái được nhiều thành quả, công việc kinh doanh thuận lợi, 'mã' tới đâu là 'lộc' theo tới đó." },
    { id: 6, title: "Ấm Áp Len Dệt", color: "Kem / Be", story: "Với tông màu kem nhã nhặn và kỹ thuật thêu tỉ mỉ, mẫu bao lì xì này mang phong cách vintage sang trọng. Dành cho những ai thích sự tối giản nhưng vẫn đầy đẳng cấp. Chú ngựa nhỏ trên nền vải dệt sẽ là món quà lưu giữ kỷ niệm khó quên trong lòng người nhận." }
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