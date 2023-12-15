import { authorizeUser } from "../src/providers/authorizeUser";
import { supabase } from "../src/providers/supabase";

module.exports = async (req, res) => {
  if (req.method === "GET") {
    // console.log(req.headers.authorization);
    const { userauthval, error } = await authorizeUser(
      "jo@example.com",
      "example1"
    );

    console.log(userauthval);

    if (userauthval != "authenticated") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const table = "users";

    let { data, error2 } = await supabase.from(table).select("*");

    if (error2) {
      console.error("Error fetching data:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({ table, data });
  }
};
