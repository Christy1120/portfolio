import { SITE } from "../data/site";

export default function Footer() {
  return (
    <footer className="py-10 border-t text-center text-sm text-slate-600">
      <div className="container">© {new Date().getFullYear()} {SITE.name}. Built with React + Tailwind.</div>
    </footer>
  );
}
