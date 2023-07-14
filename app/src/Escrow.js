export default function Escrow({
  address,
  arbiter,
  beneficiary,
  value,
  handleApprove,
  beenApproved,
}) {
  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> {beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {value} </div>
        </li>
        <div
          className={beenApproved ? 'complete' : 'button'}
          id={address}
          onClick={(e) => {
            e.preventDefault();

            if(!beenApproved) handleApprove();
          }}
        >
          {beenApproved ? "✓ It's been approved!" : "Approve"}
        </div>
      </ul>
    </div>
  );
}

