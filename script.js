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

// 1. LOGIC CUỘN TRANG
window.addEventListener('scroll', () => {
    if (!isTicking) {
        window.requestAnimationFrame(() => {
            const fanWrapper = document.getElementById('fanWrapper');
            if (window.scrollY > 100) fanWrapper.classList.add('closed');
            else fanWrapper.classList.remove('closed');
            isTicking = false;
        });
        isTicking = true;
    }
});

// 2. LOGIC MỞ MODAL
function openIOSModal(index) {
    const data = envelopeStories[index - 1];
    const cardElement = document.getElementById(`card-${index}`);
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    const modalInfo = modalContent.querySelector('.modal-info');
    activeCardId = `card-${index}`;

    document.getElementById('modal-img').src = `weblixi/bao${index}.jpg`;
    document.getElementById('modal-title').innerText = data.title;
    document.getElementById('modal-story').innerText = `"${data.story}"`;
    document.getElementById('modal-color').innerText = data.color;

    modalInfo.classList.remove('show-text'); 

    const cardRect = cardElement.getBoundingClientRect();
    modal.style.display = 'flex';
    modal.style.opacity = '0'; 

    modalContent.getBoundingClientRect(); // Force layout
    const modalRect = modalContent.getBoundingClientRect();

    const deltaX = cardRect.left - modalRect.left;
    const deltaY = cardRect.top - modalRect.top;
    const scaleW = cardRect.width / modalRect.width;
    const scaleH = cardRect.height / modalRect.height;

    const isClosed = document.getElementById('fanWrapper').classList.contains('closed');
    const rotation = isClosed ? 0 : cardRotations[index - 1];


    cardElement.style.visibility = 'hidden';

    modal.style.opacity = '1';

    modalContent.style.transition = 'none'; 
    modalContent.style.transformOrigin = 'top left';
    modalContent.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleW}, ${scaleH}) rotate(${rotation}deg)`;
    modalContent.style.borderRadius = '20px';
    modalContent.style.opacity = '1';

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            modalContent.style.transition = 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), border-radius 0.6s ease';

            modalContent.style.transform = 'translate3d(0,0,0) scale(1,1) rotate(0deg)';
            modalContent.style.borderRadius = '24px';

            modal.classList.add('visible');
        });
    });

    setTimeout(() => {
        modalInfo.classList.add('show-text');
    }, 200);
}

function closeIOSModal() {
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    const modalInfo = modalContent.querySelector('.modal-info');
    const cardElement = document.getElementById(activeCardId);
    
    if (!cardElement) { modal.style.display = 'none'; return; }

    modalInfo.classList.remove('show-text');
    modal.classList.remove('visible');

    const cardRect = cardElement.getBoundingClientRect();
    const modalRect = modalContent.getBoundingClientRect();

    const deltaX = cardRect.left - modalRect.left;
    const deltaY = cardRect.top - modalRect.top;

    const targetWidth = cardRect.width;   
    const targetHeight = cardRect.height; 

    const index = parseInt(activeCardId.split('-')[1]);
    const isClosed = document.getElementById('fanWrapper').classList.contains('closed');
    const rotation = isClosed ? 0 : cardRotations[index - 1];

    modalContent.style.width = modalRect.width + 'px';
    modalContent.style.height = modalRect.height + 'px';
  
    modalContent.getBoundingClientRect();

    modalContent.style.transition = 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1), height 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.6s ease';

    requestAnimationFrame(() => {
        modalContent.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0) rotate(${rotation}deg)`;
        modalContent.style.width = targetWidth + 'px';
        modalContent.style.height = targetHeight + 'px';
        modalContent.style.borderRadius = '20px';
    });

    const onTransitionEnd = (e) => {
        if (e.propertyName !== 'transform') return;

        modal.style.display = 'none';
        modalContent.style.transition = 'none';
        modalContent.style.transform = 'none';
        modalContent.style.width = '';  
        modalContent.style.height = ''; 
        modalContent.style.opacity = '0'; 
        cardElement.style.visibility = 'visible';
        activeCardId = null;
        
        modalContent.removeEventListener('transitionend', onTransitionEnd);
    };
    
    modalContent.addEventListener('transitionend', onTransitionEnd);
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
    navigator.clipboard.writeText(msg).then(() => {
        alert("Đã copy đơn! Dán vào Messenger nhé.");
        window.open(`https://m.me/${SHOP_INFO.facebook}`, '_blank');
    });
}
window.onclick = function (e) { if (e.target.id === 'contactModal') closeContactModal(); }