/*
 * [53] Maximum Subarray
 *
 * https://leetcode.com/problems/maximum-subarray/description/
 *
 * algorithms
 * Easy (40.83%)
 * Total Accepted:    339.3K
 * Total Submissions: 831.1K
 * Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
 *
 * Given an integer array nums, find the contiguous subarray (containing at
 * least one number) which has the largest sum and return its sum.
 * 
 * Example:
 * 
 * 
 * Input: [-2,1,-3,4,-1,2,1,-5,4],
 * Output: 6
 * Explanation: [4,-1,2,1] has the largest sum = 6.
 * 
 * 
 * Follow up:
 * 
 * If you have figured out the O(n) solution, try coding another solution using
 * the divide and conquer approach, which is more subtle.
 * 
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let result = []
  for (let i = 0; i < nums.length; i++) {
    let partResult = 0
    for (let j = i + 1; j < nums.length; j++) {
      if (partResult < 0) break
      partResult += nums[j]
    }
    result[i] = nums[i] + partResult
  }
  return Math.max.apply(null, result)
};
