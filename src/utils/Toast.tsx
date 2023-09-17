import { worksans } from "@/app/fonts";
import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  timer: 3000,
  timerProgressBar: true,
  showConfirmButton: false,
  background: "#F5F5F5",
  customClass: {
    container: `${worksans.className}`,
    title: "text-main",
    timerProgressBar: "bg-main",
  },
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const CustomAlert = Swal.mixin({
  background: "#DCDCDC",
  color: "#070707",
  customClass: {
    container: `${worksans.className} text-main`,
  },
});
