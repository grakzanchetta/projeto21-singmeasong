import { resetDatabase } from "../repositories/testRepository.js";

async function deleteData() {
  return resetDatabase();
}

export { deleteData };
