import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">PhoneBazar</h1>
        <p className="text-muted-foreground mb-6">Redirecting...</p>
        <Link to="/" className="text-primary hover:underline">Go to Home</Link>
      </div>
    </div>
  );
};

export default Index;
