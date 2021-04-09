import Link from "next/link";

export default function Custom404() {
  return (
    <main>
      <iframe
        src="https://giphy.com/embed/jkZtSdwKOx05BOlapR"
        width="480"
        height="307"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
      <p>
        <a href="https://giphy.com/gifs/nehumanesociety-dog-space-keyboard-jkZtSdwKOx05BOlapR">
          via GIPHY
        </a>
      </p>
      <Link href="/">
        <button className="btn-blue">Go home</button>
      </Link>
    </main>
  );
}
