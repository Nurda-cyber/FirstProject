import React from 'react';

const Call = () => {
  return (
    <div>
       <main className="form-signin w-100 m-auto" style={{ maxWidth: "300px" }}>
      <form className="form1" action="/users/add" method="post">
        <div className="form-floating" >
          <input type="text" className="form-control" id="text" name="text" placeholder="text" style={{ height: "100px" }}/>
          <label htmlFor="text">text</label>
        </div>
        <div className="form-check text-start my-3">
          {}
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">Add</button>
        <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2024</p>
      </form>
    </main>
    </div>
  );
};

export default Call;
