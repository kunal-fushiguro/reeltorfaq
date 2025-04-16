//  test
export async function testroute(_, res) {
  return res.status(200).json({
    statusCode: 200,
    message: "reeltor faq is working fine.",
    success: true,
  });
}

export {
  createSingleStateFaq,
  createSingleSublocalityFaq,
  deleteSingleFaq,
  getSingleFaq,
  updateSingleFaq,
} from "./faq.js";
export {
  createSingleStateFaq,
  deleteSingleStateFaq,
  getAllStateFaq,
  getSingleStateFaq,
  updateSingleStateFaq,
} from "./state.js";
export {
  createSingleSubLocalityFaq,
  deleteSingleSubLocalityFaq,
  getAllSubLocalityStateFaq,
  getSingleSubLocalityFaq,
  updateSingleSubLocalityFaq,
} from "./sublocality.js";
