import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

   //---------------------------------COMPANIES-----------------------------------

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get array of all companies
   * 
   * Can accept parameters: search by name
   */
  static async getAllCompanies(searchTerm) {
    let res = await this.request('companies', { name: searchTerm });

    return res.companies;
  }


  //---------------------------------JOBS-----------------------------------

  /** Get array of all jobs 
   * 
   * Can accept parameters: search by title
  */

  static async getAllJobs(searchTerm) {
    let res = await this.request('jobs', { title: searchTerm });
    return res.jobs;
  }
  //---------------------------------AUTH-----------------------------------
  
  /** Registers a new user
   * 
   * Accepts { username, password, firstName, lastName, email }
   * Returns the token as a string
   */
  static async register({ username, password, firstName, lastName, email }) {
    let res = await this.request("auth/register", 
                                 { username, password, firstName, lastName, email },
                                 "post")
    return res.token;
  }

  /** Login an existing user
   * 
   * Accepts { username, password }
   * Return the token as a string
   */
  static async login({username, password}) {
    let res = await this.request("auth/token", 
                                 { username, password },
                                 "post")
    return res.token;
  }

  static async getUser({username}){
    
    let res = await this.request(`users/${username}`)
    console.log("this is res from api ==>", res)
    return res.user
  }

  static async editUser({username, firstName, lastName, email, password}) {
    
      let res = await this.request(`users/${username}`,
                                    {firstName, lastName, password, email},
                                    "patch")
      return res;
  }
}


// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
