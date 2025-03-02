import "./403.css";
export default function Err403() {
  return (
    <div className="text-wrapper">
      <div className="title" data-context={404}>
        403 - Access Denied
      </div>
      <div className="subtitle">
        Oops, You don't have permission to access this page.
      </div>
    </div>
  );
}
