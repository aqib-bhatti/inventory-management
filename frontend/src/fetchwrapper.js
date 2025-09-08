export async function POST(url, payload) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      throw new Error(e.message,"Invalid server response");
    }

    if (!res.ok) {
      
      let errMsg;
      if (data.errors && Array.isArray(data.errors)) {
        errMsg = data.errors.map((e) => e.message).join(" | ");
      } else {
        errMsg = data.error || data.message || `Request failed with status ${res.status}`;
      }
      throw new Error(errMsg);
    }

    return data;
  } catch (err) {
    throw new Error(err.message || "Request failed");
  }
}


export async function GET(url) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error(data.error || "please login first");
  }

  if (!res.ok) {
    throw new Error(data.error || "something went wrong");
  }

  return data;
}

export async function PUT(url, payload) {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error(data.error || "Please login first");
  }

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export async function DELETE(url) {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await res.json();

  if (res.status === 401) {
    window.location.href = "/login";
    throw new Error(data.error || "Please login first");
  }

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}
