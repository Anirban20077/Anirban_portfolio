const API_BASE = "";

window.addEventListener("load",()=>{
  setTimeout(()=>document.querySelector(".loader")?.classList.add("hide"),1100);
});

const navbar=document.querySelector(".navbar");
window.addEventListener("scroll",()=>navbar.classList.toggle("scrolled",scrollY>40));

const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenuClose = document.querySelector(".mobile-menu-close");

function openMobileMenu() {
  mobileMenu.classList.add("open");
  mobileMenuBackdrop.classList.add("open");
  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  mobileMenuBackdrop.classList.remove("open");
  document.body.classList.remove("menu-open");
}

menuToggle?.addEventListener("click", openMobileMenu);

mobileMenuClose?.addEventListener("click", closeMobileMenu);

mobileMenuBackdrop?.addEventListener("click", closeMobileMenu);

document.querySelectorAll(".mobile-menu-links a").forEach(link => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeMobileMenu();
  }
});
/* Swipe right to close mobile menu */
let touchStartX = 0;
let touchStartY = 0;

mobileMenu?.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];

  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}, { passive: true });

mobileMenu?.addEventListener("touchend", (e) => {
  const touch = e.changedTouches[0];

  const touchEndX = touch.clientX;
  const touchEndY = touch.clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = Math.abs(touchEndY - touchStartY);

  /* Swipe right */
  if (deltaX > 70 && deltaX > deltaY) {
    closeMobileMenu();
  }
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const target=document.querySelector(a.getAttribute("href"));
    if(!target)return;
    e.preventDefault();
    target.scrollIntoView({behavior:"smooth",block:"start"});
  });
});

/* Work filters */
const filters=[...document.querySelectorAll(".filter")];
const cards=[...document.querySelectorAll(".work-card")];

function applyFilter(value){
  cards.forEach(card=>{
    card.classList.toggle("hidden",value!=="all" && card.dataset.category!==value);
  });
}
filters.forEach(btn=>btn.addEventListener("click",()=>{
  filters.forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  applyFilter(btn.dataset.filter);
}));
applyFilter("cinematic");

/* Actual video previews + true video aspect ratios */
const previewObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const video=entry.target;
    if(entry.isIntersecting){
      if(!video.dataset.loaded){
        video.src=video.closest(".work-card").dataset.video;
        video.dataset.loaded="1";
        video.load();
      }
    }else{
      video.pause();
      video.currentTime=0;
    }
  });
},{rootMargin:"250px 0px"});

document.querySelectorAll(".card-preview").forEach(video=>{
  previewObserver.observe(video);

  video.addEventListener("loadedmetadata",()=>{
    if(video.videoWidth && video.videoHeight){
      video.closest(".card-media").style.aspectRatio=`${video.videoWidth}/${video.videoHeight}`;
    }
  });

  const card=video.closest(".work-card");
  card.addEventListener("pointerenter",()=>{
    if(window.matchMedia("(pointer:fine)").matches){
      video.muted=true;
      video.play().catch(()=>{});
    }
  });
  card.addEventListener("pointerleave",()=>{
    if(window.matchMedia("(pointer:fine)").matches){
      video.pause();
      try{video.currentTime=0}catch{}
    }
  });
});

/* Video modal */
const modal=document.querySelector(".video-modal");
const modalVideo=document.querySelector(".modal-video");
const modalTitle=document.querySelector(".modal-title");
const modalCategory=document.querySelector(".modal-category");
const closeModal=()=>{
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  document.body.classList.remove("modal-open");
};
cards.forEach(card=>card.addEventListener("click",()=>{
  modalTitle.textContent=card.dataset.title;
  modalCategory.textContent=card.dataset.categoryName.toUpperCase();
  modalVideo.src=card.dataset.video;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
  modalVideo.play().catch(()=>{});
}));
document.querySelector(".modal-close").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("open"))closeModal()});

/* Subtle hover pop, no circular cursor */
document.querySelectorAll("a,button,.work-card,.service").forEach(el=>{
  el.addEventListener("pointerenter",()=>el.classList.add("pop"));
  el.addEventListener("pointerleave",()=>el.classList.remove("pop"));
});

/* Contact + feedback */
async function submitForm(form,endpoint,statusEl){
  statusEl.classList.remove("error");
  statusEl.textContent="Sending…";
  const formData = new FormData(form);

const data = {
  ...Object.fromEntries(formData.entries()),
  video_format: formData.getAll("video_format")
};

  try{
    const res=await fetch(`${API_BASE}${endpoint}`,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    });
    const result=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error(result.error||"Something went wrong.");
    statusEl.textContent="Sent successfully. Thank you.";
    form.reset();
  }catch(err){
    statusEl.textContent=err.message;
    statusEl.classList.add("error");
  }
}

document.querySelector("#contactForm").addEventListener("submit",e=>{
  e.preventDefault();
  submitForm(e.currentTarget,"/api/contact",document.querySelector("#contactStatus"));
});

document.querySelector("#feedbackForm").addEventListener("submit",e=>{
  e.preventDefault();
  submitForm(e.currentTarget,"/api/feedback",document.querySelector("#feedbackStatus"));
});

document.querySelector("#year").textContent=new Date().getFullYear();
