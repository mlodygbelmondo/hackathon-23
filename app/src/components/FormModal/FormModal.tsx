import CableForm from "./CableForm";

const FormModal = () => {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="mb-2 text-lg font-bold">Formularz zgłoszenia</h3>
        <CableForm />
      </div>
    </dialog>
  );
};
export default FormModal;
