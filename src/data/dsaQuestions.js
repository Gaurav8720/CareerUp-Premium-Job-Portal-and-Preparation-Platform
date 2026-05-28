export const dsaTopics = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stack & Queue",
  "Trees & BST",
  "Graphs",
  "Dynamic Programming"
];

export const dsaQuestions = [
  // ARRAYS
  {
    id: "dsa-1",
    topic: "Arrays",
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    inputFormat: "nums = [2,7,11,15], target = 9",
    outputFormat: "[0,1] (because nums[0] + nums[1] == 9)",
    sampleInput: "[2, 7, 11, 15], 9",
    sampleOutput: "[0, 1]",
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def twoSum(nums, target):
    # Write your code here
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
    unordered_map<int, int> mp;
    for(int i=0; i<nums.size(); i++) {
        int comp = target - nums[i];
        if(mp.count(comp)) return {mp[comp], i};
        mp[nums[i]] = i;
    }
    return {};
}`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`
    },
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] }
    ],
    validator: "(function() { return twoSum(args[0], args[1]); })"
  },
  {
    id: "dsa-2",
    topic: "Arrays",
    title: "Maximum Subarray (Kadane's)",
    difficulty: "Medium",
    description: "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    inputFormat: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
    outputFormat: "6 (Subarray [4,-1,2,1] has the largest sum = 6)",
    sampleInput: "[-2, 1, -3, 4, -1, 2, 1, -5, 4]",
    sampleOutput: "6",
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your code here
  let maxSoFar = nums[0];
  let currentMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }
  return maxSoFar;
}`,
      python: `def maxSubArray(nums):
    # Write your code here
    max_so_far = nums[0]
    curr_max = nums[0]
    for i in range(1, len(nums)):
        curr_max = max(nums[i], curr_max + nums[i])
        max_so_far = max(max_so_far, curr_max)
    return max_so_far`,
      cpp: `int maxSubArray(vector<int>& nums) {
    // Write your code here
    int max_so_far = nums[0];
    int curr_max = nums[0];
    for (size_t i = 1; i < nums.size(); ++i) {
        curr_max = max(nums[i], curr_max + nums[i]);
        max_so_far = max(max_so_far, curr_max);
    }
    return max_so_far;
}`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here
        int maxSoFar = nums[0];
        int currMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currMax = Math.max(nums[i], currMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currMax);
        }
        return maxSoFar;
    }
}`
    },
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 }
    ],
    validator: "(function() { return maxSubArray(args[0]); })"
  },
  {
    id: "dsa-3",
    topic: "Arrays",
    title: "Merge Intervals",
    difficulty: "Medium",
    description: "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    inputFormat: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
    outputFormat: "[[1,6],[8,10],[15,18]] (Intervals [1,3] and [2,6] overlap, merged into [1,6])",
    sampleInput: "[[1, 3], [2, 6], [8, 10], [15, 18]]",
    sampleOutput: "[[1, 6], [8, 10], [15, 18]]",
    starterCode: {
      javascript: `function merge(intervals) {
  // Write your code here
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const curr = intervals[i];
    if (curr[0] <= last[1]) {
      last[1] = Math.max(last[1], curr[1]);
    } else {
      merged.push(curr);
    }
  }
  return merged;
}`,
      python: `def merge(intervals):
    # Write your code here
    if len(intervals) <= 1:
        return intervals
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for curr in intervals[1:]:
        last = merged[-1]
        if curr[0] <= last[1]:
            last[1] = max(last[1], curr[1])
        else:
            merged.append(curr)
    return merged`,
      cpp: `vector<vector<int>> merge(vector<vector<int>>& intervals) {
    if (intervals.size() <= 1) return intervals;
    sort(intervals.begin(), intervals.end());
    vector<vector<int>> merged;
    merged.push_back(intervals[0]);
    for (int i = 1; i < intervals.size(); i++) {
        if (intervals[i][0] <= merged.back()[1]) {
            merged.back()[1] = max(merged.back()[1], intervals[i][1]);
        } else {
            merged.push_back(intervals[i]);
        }
    }
    return merged;
}`,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        int[] curr = intervals[0];
        merged.add(curr);
        for (int[] interval : intervals) {
            if (interval[0] <= curr[1]) {
                curr[1] = Math.max(curr[1], interval[1]);
            } else {
                curr = interval;
                merged.add(curr);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`
    },
    testCases: [
      { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
      { input: [[[1, 4], [4, 5]]], expected: [[1, 5]] }
    ],
    validator: "(function() { return merge(args[0]); })"
  },

  // STRINGS
  {
    id: "dsa-4",
    topic: "Strings",
    title: "Valid Palindrome",
    difficulty: "Easy",
    description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.\n\nGiven a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
    inputFormat: "s = 'A man, a plan, a canal: Panama'",
    outputFormat: "true (because 'amanaplanacanalpanama' is a palindrome)",
    sampleInput: "'A man, a plan, a canal: Panama'",
    sampleOutput: "true",
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your code here
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}`,
      python: `def isPalindrome(s):
    # Write your code here
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]`,
      cpp: `bool isPalindrome(string s) {
    string cleaned = "";
    for (char c : s) {
        if (isalnum(c)) cleaned += tolower(c);
    }
    string rev = cleaned;
    reverse(rev.begin(), rev.end());
    return cleaned == rev;
}`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        StringBuilder sb = new StringBuilder();
        for (char c : s.toCharArray()) {
            if (Character.isLetterOrDigit(c)) {
                sb.append(Character.toLowerCase(c));
            }
        }
        return sb.toString().equals(sb.reverse().toString());
    }
}`
    },
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expected: true },
      { input: ["race a car"], expected: false },
      { input: [" "], expected: true }
    ],
    validator: "(function() { return isPalindrome(args[0]); })"
  },
  {
    id: "dsa-5",
    topic: "Strings",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    inputFormat: "s = 'abcabcbb'",
    outputFormat: "3 (The answer is 'abc', with the length of 3)",
    sampleInput: "'abcabcbb'",
    sampleOutput: "3",
    starterCode: {
      javascript: `function lengthOfLongestSubstring(s) {
  // Write your code here
  let maxLen = 0;
  let start = 0;
  const seen = new Map();
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (seen.has(char) && seen.get(char) >= start) {
      start = seen.get(char) + 1;
    }
    seen.set(char, i);
    maxLen = Math.max(maxLen, i - start + 1);
  }
  return maxLen;
}`,
      python: `def lengthOfLongestSubstring(s):
    # Write your code here
    max_len = 0
    start = 0
    seen = {}
    for i, char in enumerate(s):
        if char in seen and seen[char] >= start:
            start = seen[char] + 1
        seen[char] = i
        max_len = max(max_len, i - start + 1)
    return max_len`,
      cpp: `int lengthOfLongestSubstring(string s) {
    int maxLen = 0, start = 0;
    unordered_map<char, int> seen;
    for (int i = 0; i < s.length(); i++) {
        if (seen.count(s[i]) && seen[s[i]] >= start) {
            start = seen[s[i]] + 1;
        }
        seen[s[i]] = i;
        maxLen = max(maxLen, i - start + 1);
    }
    return maxLen;
}`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        int maxLen = 0, start = 0;
        Map<Character, Integer> seen = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (seen.containsKey(c) && seen.get(c) >= start) {
                start = seen.get(c) + 1;
            }
            seen.put(c, i);
            maxLen = Math.max(maxLen, i - start + 1);
        }
        return maxLen;
    }
}`
    },
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 }
    ],
    validator: "(function() { return lengthOfLongestSubstring(args[0]); })"
  },

  // LINKED LIST
  {
    id: "dsa-6",
    topic: "Linked List",
    title: "Reverse Linked List",
    difficulty: "Easy",
    description: "Given the `head` of a singly linked list, reverse the list, and return the reversed list.\n\n*Note (for Mock Editor simulation):* You can simulate this using arrays representing list values.",
    inputFormat: "head = [1,2,3,4,5]",
    outputFormat: "[5,4,3,2,1]",
    sampleInput: "[1, 2, 3, 4, 5]",
    sampleOutput: "[5, 4, 3, 2, 1]",
    starterCode: {
      javascript: `// In JavaScript simulation, we pass an array representation of the linked list
function reverseList(arr) {
  // Write your code here
  return arr.slice().reverse();
}`,
      python: `def reverseList(arr):
    # Simulated array reverse
    return arr[::-1]`,
      cpp: `vector<int> reverseList(vector<int>& arr) {
    vector<int> res = arr;
    reverse(res.begin(), res.end());
    return res;
}`,
      java: `class Solution {
    public int[] reverseList(int[] arr) {
        int[] res = new int[arr.length];
        for(int i = 0; i < arr.length; i++) {
            res[i] = arr[arr.length - 1 - i];
        }
        return res;
    }
}`
    },
    testCases: [
      { input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { input: [[1, 2]], expected: [2, 1] },
      { input: [[]], expected: [] }
    ],
    validator: "(function() { return reverseList(args[0]); })"
  },
  {
    id: "dsa-7",
    topic: "Linked List",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    description: "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists in a one sorted list and return it.\n\n*Note (for Mock Editor simulation):* Inputs are arrays representing lists.",
    inputFormat: "list1 = [1,2,4], list2 = [1,3,4]",
    outputFormat: "[1,1,2,3,4,4]",
    sampleInput: "[1, 2, 4], [1, 3, 4]",
    sampleOutput: "[1, 1, 2, 3, 4, 4]",
    starterCode: {
      javascript: `function mergeTwoLists(arr1, arr2) {
  // Write your code here
  const merged = [];
  let i = 0, j = 0;
  while(i < arr1.length && j < arr2.length) {
    if(arr1[i] < arr2[j]) {
      merged.push(arr1[i++]);
    } else {
      merged.push(arr2[j++]);
    }
  }
  return [...merged, ...arr1.slice(i), ...arr2.slice(j)];
}`,
      python: `def mergeTwoLists(arr1, arr2):
    # Simulated merge
    res = []
    i, j = 0, 0
    while i < len(arr1) and j < len(arr2):
        if arr1[i] < arr2[j]:
            res.append(arr1[i])
            i += 1
        else:
            res.append(arr2[j])
            j += 1
    res.extend(arr1[i:])
    res.extend(arr2[j:])
    return res`,
      cpp: `vector<int> mergeTwoLists(vector<int>& arr1, vector<int>& arr2) {
    vector<int> res;
    int i = 0, j = 0;
    while(i < arr1.size() && j < arr2.size()) {
        if(arr1[i] < arr2[j]) res.push_back(arr1[i++]);
        else res.push_back(arr2[j++]);
    }
    while(i < arr1.size()) res.push_back(arr1[i++]);
    while(j < arr2.size()) res.push_back(arr2[j++]);
    return res;
}`,
      java: `class Solution {
    public int[] mergeTwoLists(int[] arr1, int[] arr2) {
        int[] res = new int[arr1.length + arr2.length];
        int i = 0, j = 0, k = 0;
        while(i < arr1.length && j < arr2.length) {
            if(arr1[i] < arr2[j]) res[k++] = arr1[i++];
            else res[k++] = arr2[j++];
        }
        while(i < arr1.length) res[k++] = arr1[i++];
        while(j < arr2.length) res[k++] = arr2[j++];
        return res;
    }
}`
    },
    testCases: [
      { input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
      { input: [[], []], expected: [] },
      { input: [[], [0]], expected: [0] }
    ],
    validator: "(function() { return mergeTwoLists(args[0], args[1]); })"
  },

  // STACK & QUEUE
  {
    id: "dsa-8",
    topic: "Stack & Queue",
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    inputFormat: "s = '()[]{}'",
    outputFormat: "true",
    sampleInput: "'()[]{}'",
    sampleOutput: "true",
    starterCode: {
      javascript: `function isValid(s) {
  // Write your code here
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}`,
      python: `def isValid(s):
    # Write your code here
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            return False
    return len(stack) == 0`,
      cpp: `bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> mp = {{')', '('}, {'}', '{'}, {']', '['}};
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty() || st.top() != mp[c]) return false;
            st.pop();
        }
    }
    return st.empty();
}`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> st = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.isEmpty()) return false;
                char top = st.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return st.isEmpty();
    }
}`
    },
    testCases: [
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([])"], expected: true }
    ],
    validator: "(function() { return isValid(args[0]); })"
  },

  // TREES
  {
    id: "dsa-9",
    topic: "Trees & BST",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    description: "Given the root of a binary tree, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\n*Note (for Mock Editor simulation):* We represent binary trees as arrays in level-order traversal format (null representing missing nodes).",
    inputFormat: "root = [3,9,20,null,null,15,7]",
    outputFormat: "3",
    sampleInput: "[3, 9, 20, null, null, 15, 7]",
    sampleOutput: "3",
    starterCode: {
      javascript: `// Level-order array representation simulation
function maxDepth(arr) {
  // Write your code here
  if (!arr || arr.length === 0 || arr[0] === null) return 0;
  
  // Calculate depth based on array index positioning
  // Index-based depth finder:
  function getDepth(idx) {
    if (idx >= arr.length || arr[idx] === null) return 0;
    const leftDepth = getDepth(2 * idx + 1);
    const rightDepth = getDepth(2 * idx + 2);
    return Math.max(leftDepth, rightDepth) + 1;
  }
  return getDepth(0);
}`,
      python: `def maxDepth(arr):
    if not arr or len(arr) == 0 or arr[0] is None:
        return 0
    def get_depth(idx):
        if idx >= len(arr) or arr[idx] is None:
            return 0
        return max(get_depth(2 * idx + 1), get_depth(2 * idx + 2)) + 1
    return get_depth(0)`,
      cpp: `int maxDepth(vector<int> arr) {
    if (arr.empty()) return 0;
    // index depth finder simulation helper
    auto get_depth = [&](auto& self, int idx) -> int {
        if (idx >= arr.size() || arr[idx] == -1) return 0; // -1 represents null
        return max(self(self, 2 * idx + 1), self(self, 2 * idx + 2)) + 1;
    };
    return get_depth(get_depth, 0);
}`,
      java: `class Solution {
    public int maxDepth(Integer[] arr) {
        if (arr.length == 0 || arr[0] == null) return 0;
        return getDepth(arr, 0);
    }
    private int getDepth(Integer[] arr, int idx) {
        if (idx >= arr.length || arr[idx] == null) return 0;
        return Math.max(getDepth(arr, 2 * idx + 1), getDepth(arr, 2 * idx + 2)) + 1;
    }
}`
    },
    testCases: [
      { input: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
      { input: [[1, null, 2]], expected: 2 },
      { input: [[]], expected: 0 }
    ],
    validator: "(function() { return maxDepth(args[0]); })"
  },

  // GRAPHS
  {
    id: "dsa-10",
    topic: "Graphs",
    title: "Number of Islands",
    difficulty: "Medium",
    description: "Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    inputFormat: "grid = [\n  ['1','1','1','1','0'],\n  ['1','1','0','1','0'],\n  ['1','1','0','0','0'],\n  ['0','0','0','0','0']\n]",
    outputFormat: "1",
    sampleInput: "[['1', '1', '0', '0', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1']]",
    sampleOutput: "3",
    starterCode: {
      javascript: `function numIslands(grid) {
  // Write your code here
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  
  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // mark as visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
      python: `def numIslands(grid):
    # Write your code here
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
        
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count`,
      cpp: `void dfs(vector<vector<char>>& grid, int r, int c) {
    int rows = grid.size(), cols = grid[0].size();
    if(r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(grid, r+1, c);
    dfs(grid, r-1, c);
    dfs(grid, r, c+1);
    dfs(grid, r, c-1);
}
int numIslands(vector<vector<char>>& grid) {
    if(grid.empty()) return 0;
    int count = 0;
    for(int r=0; r<grid.size(); r++) {
        for(int c=0; c<grid[0].size(); c++) {
            if(grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}`,
      java: `class Solution {
    private void dfs(char[][] grid, int r, int c) {
        int rows = grid.length, cols = grid[0].length;
        if(r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] == '0') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
    public int numIslands(char[][] grid) {
        if(grid == null || grid.length == 0) return 0;
        int count = 0;
        for(int r=0; r<grid.length; r++) {
            for(int c=0; c<grid[0].length; c++) {
                if(grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
}`
    },
    testCases: [
      {
        input: [[
          ['1', '1', '1', '1', '0'],
          ['1', '1', '0', '1', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '0', '0', '0']
        ]],
        expected: 1
      },
      {
        input: [[
          ['1', '1', '0', '0', '0'],
          ['1', '1', '0', '0', '0'],
          ['0', '0', '1', '0', '0'],
          ['0', '0', '0', '1', '1']
        ]],
        expected: 3
      }
    ],
    validator: "(function() { return numIslands(args[0]); })"
  },

  // DYNAMIC PROGRAMMING
  {
    id: "dsa-11",
    topic: "Dynamic Programming",
    title: "Climbing Stairs",
    difficulty: "Easy",
    description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    inputFormat: "n = 3",
    outputFormat: "3 (There are three ways: 1+1+1, 1+2, 2+1)",
    sampleInput: "3",
    sampleOutput: "3",
    starterCode: {
      javascript: `function climbStairs(n) {
  // Write your code here
  if (n <= 2) return n;
  let first = 1;
  let second = 2;
  for (let i = 3; i <= n; i++) {
    let third = first + second;
    first = second;
    second = third;
  }
  return second;
}`,
      python: `def climbStairs(n):
    # Write your code here
    if n <= 2:
        return n
    first, second = 1, 2
    for i in range(3, n + 1):
        first, second = second, first + second
    return second`,
      cpp: `int climbStairs(int n) {
    if (n <= 2) return n;
    int first = 1, second = 2;
    for (int i = 3; i <= n; i++) {
        int third = first + second;
        first = second;
        second = third;
    }
    return second;
}`,
      java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int first = 1, second = 2;
        for (int i = 3; i <= n; i++) {
            int third = first + second;
            first = second;
            second = third;
        }
        return second;
    }
}`
    },
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [5], expected: 8 }
    ],
    validator: "(function() { return climbStairs(args[0]); })"
  },
  {
    id: "dsa-12",
    topic: "Dynamic Programming",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    description: "Given two strings `text1` and `text2`, return the length of their longest common subsequence. If there is no common subsequence, return 0.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. (e.g., 'ace' is a subsequence of 'abcde').",
    inputFormat: "text1 = 'abcde', text2 = 'ace'",
    outputFormat: "3 (The longest common subsequence is 'ace')",
    sampleInput: "'abcde', 'ace'",
    sampleOutput: "3",
    starterCode: {
      javascript: `function longestCommonSubsequence(text1, text2) {
  // Write your code here
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}`,
      python: `def longestCommonSubsequence(text1, text2):
    # Write your code here
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
      cpp: `int longestCommonSubsequence(string text1, string text2) {
    int m = text1.length(), n = text2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}`,
      java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`
    },
    testCases: [
      { input: ["abcde", "ace"], expected: 3 },
      { input: ["abc", "abc"], expected: 3 },
      { input: ["abc", "def"], expected: 0 }
    ],
    validator: "(function() { return longestCommonSubsequence(args[0], args[1]); })"
  }
];
