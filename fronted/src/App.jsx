  import React, { useEffect, useState } from "react";

  function App() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const BASE_URL = "http://127.0.0.1:8000";
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${BASE_URL}/core/list/ticket/`);
        const data = await response.json();
        console.log(data);
        
        setTickets(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchTickets();
    }, []);

    const updateStatus = async (ticket) => {
      let nextStatus = "Open";

      if (ticket.status === "Open") {
        nextStatus = "In Progress";
      } else if (ticket.status === "In Progress") {
        nextStatus = "Resolved";
      }

      try {
        await fetch(`${BASE_URL}/core/update/ticket/${ticket.id}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...ticket,
            status: nextStatus,
          }),
        });

        fetchTickets();
      } catch (error) {
        console.error("Error updating ticket:", error);
      }
    };

    const getStatusClass = (status) => {
      switch (status) {
        case "Open":
          return "bg-danger";
        case "In Progress":
          return "bg-warning text-dark";
        case "Resolved":
          return "bg-success";
        default:
          return "bg-secondary";
      }
    };

    return (
      <div className="container py-5">
        <div className="card shadow-lg border-0">
          <div className="card-header bg-dark text-white">
            <h2 className="mb-0 text-center">Ticket managemet system</h2>
          </div>

          <div className="card-body">

            <div className="card-header bg-dark text-white">
              <h2 className="mb-0 text-center">Ticket create</h2>
            </div>
            <form>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Title</label>
                <input type="email" class="form-control" aria-describedby="emailHelp"/>
              </div>
              < div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Customer name</label>
                <input type="email" class="form-control" aria-describedby="emailHelp"/>
              </div>            
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Customer phone</label>
                <input type="email" class="form-control"  aria-describedby="emailHelp"/>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Customer email</label>
                <input type="email" class="form-control"aria-describedby="emailHelp"/>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Issue category</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Payment, "/>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Issue description</label>
                <input type="email" class="form-control" aria-describedby="emailHelp"/>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>





          <div className="card-body">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary"></div>
              </div>
            ) : tickets.length === 0 ? (
              <div className="alert alert-info text-center">
                No tickets found.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Ticket ID</th>
                      <th>Title</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Customer Name</th>
                      <th>Issue Category</th>
                      <th>Status</th>
                      <th>Created Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket.id}>
                        <td>#{ticket.id}</td>
                        <td>{ticket.title}</td>
                        <td>{ticket.customer_email}</td>
                        <td>{ticket.customer_phone}</td>
                        <td>{ticket.customer_name}</td>
                        <td>{ticket.issue_category}</td>
                        <td>{ticket.status}</td>
                        <td>{new Date(ticket.created_at).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={() => updateStatus(ticket)}
                            disabled={ticket.status === "Resolved"}
                          >
                            {ticket.status === "Resolved"
                              ? "Completed"
                              : "Update Status"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  export default App;