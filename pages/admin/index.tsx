import AuthCheck from "../../components/AuthCheck";

export default function AdminPostsPage(props) {
  return (
    <main>
      <AuthCheck>
        <div>Admin Page</div>
      </AuthCheck>
    </main>
  );
}
