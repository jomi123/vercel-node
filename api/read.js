import { supabase } from "../src/providers/supabase";

module.exports = async (req, res) => {
  if (req.method === "GET") {
    const table = "events";

    let { data, error } = await supabase.from(table).select("*");

    if (error) {
      console.error("Error fetching data:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json({ table2:table, data });
  }
};
