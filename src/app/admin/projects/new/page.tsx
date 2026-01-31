import { ProjectForm } from "../ProjectForm";

export default function AdminNewProjectPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Add project</h1>
      <ProjectForm />
    </div>
  );
}
