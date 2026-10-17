'use strict';

const STORAGE_KEY = 'cpp-algo-lab:v1';
const RUN_TIMEOUT_MS = 4000;
const ALGORITHM_IDS = ['bubble', 'selection', 'insertion', 'binary'];

const ALGORITHMS = {
  bubble: {
    id: 'bubble',
    title: '冒泡排序',
    english: 'Bubble Sort',
    kind: 'sort',
    eyebrow: 'SORTING · ARRAY · C++17',
    heroDescription: '用动画理解每一次比较与交换，再让 C++ 代码、执行步骤和练习题一一对应。',
    meta: [
      '<b>O(n²)</b> 平均复杂度和最坏复杂度',
      '<b>O(1)</b> 原地排序',
      '<b>稳定</b> 相等元素相对顺序不变'
    ],
    lesson: {
      kicker: '01 · 核心思想',
      title: '较大的元素，一步一步“浮”到右边',
      lead: '冒泡排序反复检查相邻的两个元素。如果左边的元素更大，就交换它们，让较大的值向右移动。每一轮结束后，当前未排序区间里的最大值都会到达最右侧。',
      concepts: [
        { title: '从相邻元素开始', text: '只比较 <code>a[j]</code> 和 <code>a[j + 1]</code>，让局部顺序正确。' },
        { title: '每轮确定一个位置', text: '第 <code>i</code> 轮结束后，末尾的 <code>i + 1</code> 个元素已经排好。' },
        { title: '没有交换就提前结束', text: '如果一整轮都没有发生交换，数组已经有序，不需要继续扫描。' }
      ],
      invariant: '每轮开始前，数组末端的已排序区间保持有序；每轮结束后，这个区间向右扩展一个位置。'
    },
    visual: {
      title: '一步一步看排序过程',
      inputLabel: '测试数组',
      defaultArray: [5, 1, 4, 2, 8],
      metrics: [
        { key: 'comparisons', label: '比较' },
        { key: 'swaps', label: '交换' }
      ]
    },
    code: {
      heading: '动画正在执行哪一行？',
      intro: '播放动画时，代码会同步高亮，你可以把每次比较和交换对应到 C++ 语句。',
      filename: 'bubble_sort.cpp',
      lines: [
        '<span class="t-key">#include</span> <span class="t-string">&lt;iostream&gt;</span>',
        '<span class="t-key">#include</span> <span class="t-string">&lt;vector&gt;</span>',
        '<span class="t-key">using</span> <span class="t-key">namespace</span> std;',
        '',
        '<span class="t-type">void</span> <span class="t-fn">bubbleSort</span>(vector&lt;<span class="t-type">int</span>&gt;&amp; a) {',
        '    <span class="t-type">int</span> n = a.size();',
        '    <span class="t-key">for</span> (<span class="t-type">int</span> i = 0; i &lt; n - 1; ++i) {',
        '        <span class="t-type">bool</span> swapped = <span class="t-key">false</span>;',
        '        <span class="t-key">for</span> (<span class="t-type">int</span> j = 0; j &lt; n - i - 1; ++j) {',
        '            <span class="t-comment">// 当前未排序区间的最后一个位置是 n - i - 1</span>',
        '            <span class="t-key">if</span> (a[j] &gt; a[j + 1]) {',
        '                swap(a[j], a[j + 1]);',
        '                swapped = <span class="t-key">true</span>;',
        '            }',
        '        }',
        '        <span class="t-key">if</span> (!swapped) <span class="t-key">break</span>;',
        '    }',
        '}',
        '',
        '<span class="t-type">int</span> <span class="t-fn">main</span>() {',
        '    vector&lt;<span class="t-type">int</span>&gt; a = {5, 1, 4, 2, 8};',
        '    bubbleSort(a);',
        '    <span class="t-key">for</span> (<span class="t-type">int</span> x : a) cout &lt;&lt; x &lt;&lt; <span class="t-string">\' \'</span>;',
        '}'
      ]
    },
    complexity: [
      { label: '最好情况', value: 'O(n)', description: '数组已经有序，只扫描一轮。' },
      { label: '平均 / 最坏', value: 'O(n²)', description: '逆序时比较和交换次数最多。' },
      { label: '额外空间', value: 'O(1)', description: '只使用少量临时变量。' }
    ],
    exercises: [
      {
        id: 'bubble-queued-value',
        prompt: '对一个长度为 6 的数组执行冒泡排序，第一轮结束后，哪个元素会到达最后一个位置？',
        options: [
          { key: 'A', text: '数组中最小的元素' },
          { key: 'B', text: '数组中最大的元素' },
          { key: 'C', text: '原来的第一个元素' },
          { key: 'D', text: '无法确定' }
        ],
        answer: 'B',
        explanation: '第一轮会让本轮遇到的最大值持续向右交换，最终停在数组末尾。'
      },
      {
        id: 'bubble-comparisons',
        prompt: '在没有提前退出优化的最坏情况下，长度为 6 的数组需要比较多少次？',
        options: [
          { key: 'A', text: '5 次' },
          { key: 'B', text: '10 次' },
          { key: 'C', text: '15 次' },
          { key: 'D', text: '36 次' }
        ],
        answer: 'C',
        explanation: '比较次数为 (n - 1) + (n - 2) + ... + 1 = n(n - 1) / 2。n = 6 时为 15。'
      },
      {
        id: 'bubble-early-exit',
        prompt: '代码中 `if (!swapped) break;` 建议什么时候提前结束排序？',
        options: [
          { key: 'A', text: '只要发生过一次交换就结束' },
          { key: 'B', text: '某一轮没有发生任何交换时结束' },
          { key: 'C', text: '第一个元素确定位置后结束' },
          { key: 'D', text: '数组长度小于 10 时结束' }
        ],
        answer: 'B',
        explanation: '如果一整轮都没有交换，说明相邻元素都已经有序，此时可以停止扫描。'
      },
      {
        id: 'bubble-swap-line',
        prompt: '当 `a[j] > a[j + 1]` 为真时，代码会执行哪一行？',
        options: [
          { key: 'A', text: '`int n = a.size();`' },
          { key: 'B', text: '`swapped = true;` 但不会交换元素' },
          { key: 'C', text: '`swap(a[j], a[j + 1]);`' },
          { key: 'D', text: '`if (!swapped) break;`' }
        ],
        answer: 'C',
        explanation: '左边的元素更大时，需要交换相邻元素，让较大的值继续向右移动。'
      }
    ],
    presets: {
      reverse: () => ({ values: [9, 8, 7, 6, 5, 4] }),
      nearly: () => ({ values: [1, 2, 4, 3, 5, 6] }),
      random: () => ({ values: createRandomArray(6) })
    },
    generateSteps: generateBubbleSteps
  },
  selection: {
    id: 'selection',
    title: '选择排序',
    english: 'Selection Sort',
    kind: 'sort',
    eyebrow: 'SORTING · SELECTION · C++17',
    heroDescription: '每一轮从未排序区间中找出最小值，再把它与区间起点交换，逐步扩大已排序前缀。',
    meta: [
      '<b>O(n²)</b> 比较复杂度始终相同',
      '<b>0 到 n-1 次</b> 交换次数较少',
      '<b>不稳定</b> 交换可能改变相等元素顺序'
    ],
    lesson: {
      kicker: '01 · 核心思想',
      title: '每轮只做一次交换，把最小值放到前面',
      lead: '选择排序把数组分成“已排序前缀”和“未排序后缀”。每一轮扫描整个未排序后缀，找到最小元素的位置，然后将它与未排序区间的第一个元素交换。',
      concepts: [
        { title: '先找最小值', text: '第 <code>i</code> 轮从 <code>i</code> 开始扫描，记录最小元素的下标 <code>minIndex</code>。' },
        { title: '每轮最多交换一次', text: '扫描结束后，如果最小值不在位置 <code>i</code>，只执行一次交换。' },
        { title: '比较次数固定', text: '无论数组初始顺序如何，总比较次数都是 <code>n(n - 1) / 2</code>。' }
      ],
      invariant: '第 i 轮开始前，数组前 i 个位置已经放好全局最小的 i 个元素，并且保持升序。'
    },
    visual: {
      title: '先找最小值，再交换到前面',
      inputLabel: '测试数组',
      defaultArray: [5, 1, 4, 2, 8],
      metrics: [
        { key: 'comparisons', label: '比较' },
        { key: 'swaps', label: '交换' }
      ]
    },
    code: {
      heading: '找到最小值后交换一次',
      intro: '动画中的黄色表示正在比较，红色表示准备交换的位置。',
      filename: 'selection_sort.cpp',
      lines: [
        '<span class="t-key">#include</span> <span class="t-string">&lt;iostream&gt;</span>',
        '<span class="t-key">#include</span> <span class="t-string">&lt;vector&gt;</span>',
        '<span class="t-key">#include</span> <span class="t-string">&lt;algorithm&gt;</span>',
        '<span class="t-key">using</span> <span class="t-key">namespace</span> std;',
        '',
        '<span class="t-type">void</span> <span class="t-fn">selectionSort</span>(vector&lt;<span class="t-type">int</span>&gt;&amp; a) {',
        '    <span class="t-type">int</span> n = a.size();',
        '    <span class="t-key">for</span> (<span class="t-type">int</span> i = 0; i &lt; n - 1; ++i) {',
        '        <span class="t-type">int</span> minIndex = i;',
        '        <span class="t-key">for</span> (<span class="t-type">int</span> j = i + 1; j &lt; n; ++j) {',
        '            <span class="t-key">if</span> (a[j] &lt; a[minIndex]) {',
        '                minIndex = j;',
        '            }',
        '        }',
        '        <span class="t-key">if</span> (minIndex != i) {',
        '            swap(a[i], a[minIndex]);',
        '        }',
        '    }',
        '}',
        '',
        '<span class="t-type">int</span> <span class="t-fn">main</span>() {',
        '    vector&lt;<span class="t-type">int</span>&gt; a = {5, 1, 4, 2, 8};',
        '    selectionSort(a);',
        '    <span class="t-key">for</span> (<span class="t-type">int</span> x : a) cout &lt;&lt; x &lt;&lt; <span class="t-string">\' \'</span>;',
        '}'
      ]
    },
    complexity: [
      { label: '比较次数', value: 'O(n²)', description: '任何输入都需要比较所有元素对。' },
      { label: '交换次数', value: 'O(n)', description: '最多发生 n - 1 次交换。' },
      { label: '额外空间', value: 'O(1)', description: '只保存最小值和下标。' }
    ],
    exercises: [
      {
        id: 'selection-first-pass',
        prompt: '选择排序第一轮结束后，数组的哪个位置一定已经放好正确元素？',
        options: [
          { key: 'A', text: '第一个位置' },
          { key: 'B', text: '最后一个位置' },
          { key: 'C', text: '中间位置' },
          { key: 'D', text: '所有位置' }
        ],
        answer: 'A',
        explanation: '第一轮找出整个数组的最小值，并把它交换到索引 0。'
      },
      {
        id: 'selection-swap-count',
        prompt: '长度为 n 的选择排序最多执行多少次交换？',
        options: [
          { key: 'A', text: 'n 次' },
          { key: 'B', text: 'n - 1 次' },
          { key: 'C', text: 'n(n - 1) / 2 次' },
          { key: 'D', text: '1 次' }
        ],
        answer: 'B',
        explanation: '每一轮最多交换一次，外层循环共有 n - 1 轮。'
      },
      {
        id: 'selection-comparisons',
        prompt: '长度为 6 的选择排序，在最坏情况下需要比较多少次？',
        options: [
          { key: 'A', text: '6 次' },
          { key: 'B', text: '15 次' },
          { key: 'C', text: '30 次' },
          { key: 'D', text: '36 次' }
        ],
        answer: 'B',
        explanation: '比较次数固定为 (n - 1) + ... + 1，n = 6 时为 15。'
      },
      {
        id: 'selection-stable',
        prompt: '普通的选择排序通常是稳定排序吗？',
        options: [
          { key: 'A', text: '是，永远稳定' },
          { key: 'B', text: '不是，交换可能改变相等元素的相对顺序' },
          { key: 'C', text: '只有数组逆序时才稳定' },
          { key: 'D', text: '只有元素不重复时才稳定' }
        ],
        answer: 'B',
        explanation: '一次远距离交换可能把相等元素跨过彼此，因此普通选择排序通常不稳定。'
      }
    ],
    presets: {
      reverse: () => ({ values: [9, 8, 7, 6, 5, 4] }),
      nearly: () => ({ values: [1, 2, 4, 3, 5, 6] }),
      random: () => ({ values: createRandomArray(6) })
    },
    generateSteps: generateSelectionSteps
  },
  insertion: {
    id: 'insertion',
    title: '插入排序',
    english: 'Insertion Sort',
    kind: 'sort',
    eyebrow: 'SORTING · INSERTION · C++17',
    heroDescription: '把当前元素插入到前面已经有序的区间中，让小数组或接近有序的数据非常高效。',
    meta: [
      '<b>O(n)</b> 最好情况复杂度',
      '<b>O(n²)</b> 平均和最坏复杂度',
      '<b>稳定</b> 不会跨越相等的元素'
    ],
    lesson: {
      kicker: '01 · 核心思想',
      title: '像整理扑克牌一样，把元素插入正确位置',
      lead: '插入排序从第二个元素开始，把当前元素看作待插入的 key。它不断与左侧已经有序的部分比较，较大的元素向右移动，直到找到 key 的正确位置。',
      concepts: [
        { title: '左侧始终有序', text: '第 <code>i</code> 轮开始前，<code>a[0]</code> 到 <code>a[i - 1]</code> 已经按升序排列。' },
        { title: '较大的元素向右移动', text: '当 <code>a[j] &gt; key</code> 时执行 <code>a[j + 1] = a[j]</code>。' },
        { title: '数据越接近有序越快', text: '如果数组已经有序，每轮只比较一次，总复杂度为 <code>O(n)</code>。' }
      ],
      invariant: '每轮插入完成后，数组开头到当前位置的区间保持升序，并且包含原数组前 i + 1 个元素。'
    },
    visual: {
      title: '观察 key 如何找到插入位置',
      inputLabel: '测试数组',
      defaultArray: [5, 1, 4, 2, 8],
      metrics: [
        { key: 'comparisons', label: '比较' },
        { key: 'moves', label: '移动' }
      ]
    },
    code: {
      heading: 'key 最终插入到哪个位置？',
      intro: '动画中的红色位置表示正在移动的元素，绿色区间是已经保持有序的前缀。',
      filename: 'insertion_sort.cpp',
      lines: [
        '<span class="t-key">#include</span> <span class="t-string">&lt;iostream&gt;</span>',
        '<span class="t-key">#include</span> <span class="t-string">&lt;vector&gt;</span>',
        '<span class="t-key">using</span> <span class="t-key">namespace</span> std;',
        '',
        '<span class="t-type">void</span> <span class="t-fn">insertionSort</span>(vector&lt;<span class="t-type">int</span>&gt;&amp; a) {',
        '    <span class="t-type">int</span> n = a.size();',
        '    <span class="t-key">for</span> (<span class="t-type">int</span> i = 1; i &lt; n; ++i) {',
        '        <span class="t-type">int</span> key = a[i];',
        '        <span class="t-type">int</span> j = i - 1;',
        '        <span class="t-key">while</span> (j &gt;= 0 &amp;&amp; a[j] &gt; key) {',
        '            a[j + 1] = a[j];',
        '            --j;',
        '        }',
        '        a[j + 1] = key;',
        '    }',
        '}',
        '',
        '<span class="t-type">int</span> <span class="t-fn">main</span>() {',
        '    vector&lt;<span class="t-type">int</span>&gt; a = {5, 1, 4, 2, 8};',
        '    insertionSort(a);',
        '    <span class="t-key">for</span> (<span class="t-type">int</span> x : a) cout &lt;&lt; x &lt;&lt; <span class="t-string">\' \'</span>;',
        '}'
      ]
    },
    complexity: [
      { label: '最好情况', value: 'O(n)', description: '数组已有序，每轮只比较一次。' },
      { label: '平均 / 最坏', value: 'O(n²)', description: '逆序时需要大量比较和移动。' },
      { label: '额外空间', value: 'O(1)', description: '只需要保存 key 和下标。' }
    ],
    exercises: [
      {
        id: 'insertion-best-case',
        prompt: '插入排序在什么情况下的时间复杂度是 O(n)？',
        options: [
          { key: 'A', text: '数组完全逆序' },
          { key: 'B', text: '数组已经有序' },
          { key: 'C', text: '数组元素全部相等' },
          { key: 'D', text: '数组长度为 1' }
        ],
        answer: 'B',
        explanation: '数组已经有序时，每个 key 只需和左侧最后一个元素比较一次。'
      },
      {
        id: 'insertion-while',
        prompt: '`while (j >= 0 && a[j] > key)` 中 `a[j] > key` 为真时会发生什么？',
        options: [
          { key: 'A', text: '交换 key 和 a[j]' },
          { key: 'B', text: '把 a[j] 向右移动一个位置' },
          { key: 'C', text: '结束本轮插入' },
          { key: 'D', text: '重新从数组开头扫描' }
        ],
        answer: 'B',
        explanation: '代码执行 `a[j + 1] = a[j]`，为 key 腾出左侧空间。'
      },
      {
        id: 'insertion-stable',
        prompt: '插入排序通常是稳定排序吗？',
        options: [
          { key: 'A', text: '是' },
          { key: 'B', text: '不是' },
          { key: 'C', text: '只对整数稳定' },
          { key: 'D', text: '只对逆序数组稳定' }
        ],
        answer: 'A',
        explanation: '只有 `a[j] > key` 时才移动，相等元素不会被跨越，因此稳定。'
      },
      {
        id: 'insertion-prefix',
        prompt: '插入排序第 i 轮开始前，哪一部分已经有序？',
        options: [
          { key: 'A', text: '从 0 到 i - 1' },
          { key: 'B', text: '从 i 到 n - 1' },
          { key: 'C', text: '整个数组' },
          { key: 'D', text: '只有 a[0]' }
        ],
        answer: 'A',
        explanation: '插入排序不断扩大左侧有序前缀，当前待插入元素是 a[i]。'
      }
    ],
    presets: {
      reverse: () => ({ values: [9, 8, 7, 6, 5, 4] }),
      nearly: () => ({ values: [1, 2, 4, 3, 5, 6] }),
      random: () => ({ values: createRandomArray(6) })
    },
    generateSteps: generateInsertionSteps
  },
  binary: {
    id: 'binary',
    title: '二分查找',
    english: 'Binary Search',
    kind: 'search',
    eyebrow: 'SEARCH · SORTED ARRAY · C++17',
    heroDescription: '通过比较中间元素，每次排除一半搜索区间，在有序数组中快速定位目标值。',
    meta: [
      '<b>O(log n)</b> 时间复杂度',
      '<b>有序数组</b> 使用前必须满足',
      '<b>O(1)</b> 额外空间'
    ],
    lesson: {
      kicker: '01 · 核心思想',
      title: '每次排除一半，而不是逐个检查',
      lead: '二分查找维护一个包含可能答案的闭区间 [left, right]。每次取中间位置 mid，与目标值比较后，排除左半部分或右半部分，直到找到目标或区间为空。',
      concepts: [
        { title: '数组必须有序', text: '只有升序或降序数组才能根据 <code>a[mid]</code> 判断目标在哪一半。' },
        { title: '闭区间搜索', text: '循环条件是 <code>left &lt;= right</code>，左右边界都可能是答案。' },
        { title: '安全计算中点', text: '<code>left + (right - left) / 2</code> 可以避免直接相加造成溢出。' }
      ],
      invariant: '如果目标值存在，那么它一定位于当前闭区间 [left, right] 内。'
    },
    visual: {
      title: '观察搜索区间如何缩小',
      inputLabel: '已排序数组',
      defaultArray: [1, 3, 5, 7, 9, 11, 13],
      defaultTarget: 7,
      metrics: [
        { key: 'probes', label: '检查' },
        { key: 'rangeSize', label: '区间' }
      ]
    },
    code: {
      heading: '每次比较会排除哪一半？',
      intro: '黄色柱表示当前中点，淡出的柱已经被排除，绿色柱表示找到目标。',
      filename: 'binary_search.cpp',
      lines: [
        '<span class="t-key">#include</span> <span class="t-string">&lt;iostream&gt;</span>',
        '<span class="t-key">#include</span> <span class="t-string">&lt;vector&gt;</span>',
        '<span class="t-key">using</span> <span class="t-key">namespace</span> std;',
        '',
        '<span class="t-type">int</span> <span class="t-fn">binarySearch</span>(<span class="t-key">const</span> vector&lt;<span class="t-type">int</span>&gt;&amp; a, <span class="t-type">int</span> target) {',
        '    <span class="t-type">int</span> left = 0;',
        '    <span class="t-type">int</span> right = a.size() - 1;',
        '',
        '    <span class="t-key">while</span> (left &lt;= right) {',
        '        <span class="t-type">int</span> mid = left + (right - left) / 2;',
        '',
        '        <span class="t-key">if</span> (a[mid] == target) {',
        '            <span class="t-key">return</span> mid;',
        '        }',
        '        <span class="t-key">if</span> (a[mid] &lt; target) {',
        '            left = mid + 1;',
        '        } <span class="t-key">else</span> {',
        '            right = mid - 1;',
        '        }',
        '    }',
        '',
        '    <span class="t-key">return</span> -1;',
        '}',
        '',
        '<span class="t-type">int</span> <span class="t-fn">main</span>() {',
        '    vector&lt;<span class="t-type">int</span>&gt; a = {1, 3, 5, 7, 9, 11, 13};',
        '    cout &lt;&lt; binarySearch(a, 7);',
        '}'
      ]
    },
    complexity: [
      { label: '最好情况', value: 'O(1)', description: '第一次就命中中间元素。' },
      { label: '平均 / 最坏', value: 'O(log n)', description: '每次排除大约一半区间。' },
      { label: '额外空间', value: 'O(1)', description: '只保存左右边界和中点。' }
    ],
    exercises: [
      {
        id: 'binary-prerequisite',
        prompt: '使用普通二分查找前，数组必须满足什么条件？',
        options: [
          { key: 'A', text: '元素互不相同' },
          { key: 'B', text: '已经按某种顺序有序' },
          { key: 'C', text: '数组长度为奇数' },
          { key: 'D', text: '所有元素都是正数' }
        ],
        answer: 'B',
        explanation: '只有有序数组才能根据中间元素判断目标位于左半区还是右半区。'
      },
      {
        id: 'binary-exclusion',
        prompt: '如果 `a[mid] < target`，下一步应如何更新边界？',
        options: [
          { key: 'A', text: 'right = mid - 1' },
          { key: 'B', text: 'left = mid + 1' },
          { key: 'C', text: 'left = 0' },
          { key: 'D', text: 'right = a.size() - 1' }
        ],
        answer: 'B',
        explanation: '中间值小于目标，说明目标只可能在右半区，因此把 left 移到 mid + 1。'
      },
      {
        id: 'binary-mid-formula',
        prompt: '为什么推荐写 `left + (right - left) / 2` 而不是直接写 `(left + right) / 2`？',
        options: [
          { key: 'A', text: '它总是更快' },
          { key: 'B', text: '它可以避免 left + right 溢出的风险' },
          { key: 'C', text: '它一定返回较大的一侧中值' },
          { key: 'D', text: '它不需要有序数组' }
        ],
        answer: 'B',
        explanation: '当 left 和 right 很大时，直接相加可能溢出；先求差值更安全。'
      },
      {
        id: 'binary-complexity',
        prompt: '长度为 16 的有序数组，二分查找最多大约需要多少次比较？',
        options: [
          { key: 'A', text: '2 次' },
          { key: 'B', text: '4 次' },
          { key: 'C', text: '8 次' },
          { key: 'D', text: '16 次' }
        ],
        answer: 'B',
        explanation: '每次把区间减半，16 → 8 → 4 → 2 → 1，属于对数增长。'
      }
    ],
    presets: {
      reverse: () => ({ values: [-3, 1, 4, 7, 10, 14], target: 7 }),
      nearly: () => ({ values: [1, 3, 5, 8, 13, 21], target: 13 }),
      random: () => {
        const values = createRandomArray(6).sort((a, b) => a - b);
        const target = Math.random() > 0.35 ? values[Math.floor(Math.random() * values.length)] : 17;
        return { values, target };
      }
    },
    generateSteps: generateBinarySearchSteps
  }
};

// ---------------------------------------------------------------------------
// 编程题数据：每个算法 3 道，学生可在本地写好后粘贴提交，由 JSCPP 在浏览器内判题
// 期望输出均由标准实现校验过
// ---------------------------------------------------------------------------
const PROGRAMMING_PROBLEMS = {
  bubble: [
    {
      id: 'bubble-prog-asc',
      title: '用冒泡排序升序排列',
      level: '基础',
      prompt: '读入 n 个整数，用冒泡排序把它们从小到大排好序。',
      io: '输入：第一行一个整数 n；第二行 n 个整数，用空格分隔。\n输出：排序后的 n 个整数，用空格分隔。',
      hint: '两层循环：外层控制轮数，内层从前往后比较相邻元素；只要左边的比右边大就交换。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    // TODO: 在这里用冒泡排序，把数组 a 从小到大排序

    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    return 0;
}
`,
      tests: [
        { label: '样例', input: '5\n5 1 4 2 8\n', expected: '1 2 4 5 8' },
        { label: '完全逆序', input: '6\n9 8 7 6 5 4\n', expected: '4 5 6 7 8 9' },
        { label: '只有一个元素', input: '1\n7\n', expected: '7' }
      ]
    },
    {
      id: 'bubble-prog-swaps',
      title: '统计冒泡排序的交换次数',
      level: '进阶',
      prompt: '读入 n 个整数，用冒泡排序排序，并输出整个过程中一共交换了多少次。',
      io: '输入：第一行一个整数 n；第二行 n 个整数。\n输出：一个整数，表示交换的总次数。',
      hint: '在交换元素的那一步里，让计数器加 1。已经有序的数组交换次数是 0。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    int swaps = 0;
    // TODO: 用冒泡排序排序 a，每发生一次元素交换就让 swaps 加 1

    cout << swaps << endl;
    return 0;
}
`,
      tests: [
        { label: '样例', input: '5\n5 1 4 2 8\n', expected: '4' },
        { label: '完全逆序', input: '4\n4 3 2 1\n', expected: '6' },
        { label: '已经有序', input: '3\n1 2 3\n', expected: '0' }
      ]
    },
    {
      id: 'bubble-prog-desc',
      title: '用冒泡排序降序排列',
      level: '进阶',
      prompt: '读入 n 个整数，用冒泡排序把它们从大到小排好序。',
      io: '输入：第一行一个整数 n；第二行 n 个整数。\n输出：从大到小排好序的 n 个整数，用空格分隔。',
      hint: '和升序只差一个地方：比较相邻元素时，判断条件要反过来。注意相等元素不要交换。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    // TODO: 在这里用冒泡排序，把数组 a 从大到小排序

    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    return 0;
}
`,
      tests: [
        { label: '样例', input: '5\n5 1 4 2 8\n', expected: '8 5 4 2 1' },
        { label: '本来升序', input: '4\n4 3 2 1\n', expected: '4 3 2 1' },
        { label: '含有重复值', input: '5\n3 3 1 2 3\n', expected: '3 3 3 2 1' }
      ]
    }
  ],

  selection: [
    {
      id: 'selection-prog-asc',
      title: '用选择排序升序排列',
      level: '基础',
      prompt: '读入 n 个整数，用选择排序把它们从小到大排好序。',
      io: '输入：第一行一个整数 n；第二行 n 个整数。\n输出：排序后的 n 个整数，用空格分隔。',
      hint: '每一轮从未排序区间里找出最小值，把它换到区间的最前面。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    // TODO: 在这里用选择排序，把数组 a 从小到大排序

    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    return 0;
}
`,
      tests: [
        { label: '样例', input: '5\n5 1 4 2 8\n', expected: '1 2 4 5 8' },
        { label: '随机数据', input: '6\n29 10 14 37 13 4\n', expected: '4 10 13 14 29 37' },
        { label: '两个元素', input: '2\n3 1\n', expected: '1 3' }
      ]
    },
    {
      id: 'selection-prog-swaps',
      title: '统计选择排序的交换次数',
      level: '进阶',
      prompt: '读入 n 个整数，用选择排序排序。只有当本轮的最小值不在本轮起始位置、真正需要交换时才计数一次，输出交换总次数。',
      io: '输入：第一行一个整数 n；第二行 n 个整数。\n输出：一个整数，表示真正发生交换的次数。',
      hint: '先记住最小值的下标，一轮扫描结束后如果这个下标和本轮起点不同，才交换并让计数器加 1。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    int swaps = 0;
    // TODO: 用选择排序排序 a，只有真正发生交换时才让 swaps 加 1

    cout << swaps << endl;
    return 0;
}
`,
      tests: [
        { label: '样例', input: '5\n5 1 4 2 8\n', expected: '2' },
        { label: '完全逆序', input: '4\n4 3 2 1\n', expected: '2' },
        { label: '已经有序', input: '3\n1 2 3\n', expected: '0' }
      ]
    },
    {
      id: 'selection-prog-desc',
      title: '用选择排序降序排列',
      level: '进阶',
      prompt: '读入 n 个整数，用选择排序把它们从大到小排好序。',
      io: '输入：第一行一个整数 n；第二行 n 个整数。\n输出：从大到小排好序的 n 个整数，用空格分隔。',
      hint: '与升序相比，只需要把"找最小值"改成"找最大值"。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    // TODO: 在这里用选择排序，把数组 a 从大到小排序

    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    return 0;
}
`,
      tests: [
        { label: '样例', input: '5\n5 1 4 2 8\n', expected: '8 5 4 2 1' },
        { label: '完全逆序', input: '4\n4 3 2 1\n', expected: '4 3 2 1' },
        { label: '含有重复值', input: '5\n3 3 1 2 3\n', expected: '3 3 3 2 1' }
      ]
    }
  ],

  insertion: [
    {
      id: 'insertion-prog-asc',
      title: '用插入排序升序排列',
      level: '基础',
      prompt: '读入 n 个整数，用插入排序把它们从小到大排好序。',
      io: '输入：第一行一个整数 n；第二行 n 个整数。\n输出：排序后的 n 个整数，用空格分隔。',
      hint: '像整理扑克牌：从第二个元素开始，把它当成待插入的 key，和左边已排好的部分依次比较，较大的元素向右让位。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    // TODO: 在这里用插入排序，把数组 a 从小到大排序

    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    return 0;
}
`,
      tests: [
        { label: '样例', input: '5\n5 1 4 2 8\n', expected: '1 2 4 5 8' },
        { label: '穿插数据', input: '5\n2 4 6 1 3\n', expected: '1 2 3 4 6' },
        { label: '只有一个元素', input: '1\n7\n', expected: '7' }
      ]
    },
    {
      id: 'insertion-prog-moves',
      title: '统计插入排序的移动次数',
      level: '进阶',
      prompt: '读入 n 个整数，用插入排序排序。每把一个元素向右移动一位记为一次移动，输出移动的总次数。',
      io: '输入：第一行一个整数 n；第二行 n 个整数。\n输出：一个整数，表示元素向右移动的总次数。',
      hint: 'key 左侧比 key 大的元素都要向右挪一格，每挪一次计数器加 1；把 key 放到最终位置不算移动。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    int moves = 0;
    // TODO: 用插入排序排序 a，每把一个元素向右移动一位就让 moves 加 1

    cout << moves << endl;
    return 0;
}
`,
      tests: [
        { label: '样例', input: '5\n5 1 4 2 8\n', expected: '4' },
        { label: '完全逆序', input: '4\n4 3 2 1\n', expected: '6' },
        { label: '已经有序', input: '3\n1 2 3\n', expected: '0' }
      ]
    },
    {
      id: 'insertion-prog-desc',
      title: '用插入排序降序排列',
      level: '进阶',
      prompt: '读入 n 个整数，用插入排序把它们从大到小排好序。',
      io: '输入：第一行一个整数 n；第二行 n 个整数。\n输出：从大到小排好序的 n 个整数，用空格分隔。',
      hint: '把"左边元素比 key 大就右移"改成"左边元素比 key 小就右移"。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    // TODO: 在这里用插入排序，把数组 a 从大到小排序

    for (int i = 0; i < n; i++) {
        if (i > 0) cout << " ";
        cout << a[i];
    }
    cout << endl;
    return 0;
}
`,
      tests: [
        { label: '样例', input: '5\n5 1 4 2 8\n', expected: '8 5 4 2 1' },
        { label: '穿插数据', input: '5\n2 4 6 1 3\n', expected: '6 4 3 2 1' },
        { label: '完全逆序', input: '4\n4 3 2 1\n', expected: '4 3 2 1' }
      ]
    }
  ],

  binary: [
    {
      id: 'binary-prog-index',
      title: '用二分查找找目标值',
      level: '基础',
      prompt: '读入一个升序排列的数组和一个目标值，用二分查找判断目标值在数组中的下标。找不到时输出 -1。',
      io: '输入：第一行一个整数 n；第二行 n 个升序排列的整数；第三行一个整数 target。\n输出：target 的下标（从 0 开始），找不到输出 -1。',
      hint: '用 left 和 right 维护当前查找区间，每次取中点比较，根据大小关系把区间缩小一半。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    int target;
    cin >> target;

    int pos = -1;
    // TODO: 用二分查找在数组 a 中找到 target 的下标并存到 pos，找不到就保持 -1

    cout << pos << endl;
    return 0;
}
`,
      tests: [
        { label: '能找到', input: '6\n1 3 5 7 9 11\n7\n', expected: '3' },
        { label: '找不到', input: '6\n1 3 5 7 9 11\n4\n', expected: '-1' },
        { label: '只有一个元素', input: '1\n5\n5\n', expected: '0' }
      ]
    },
    {
      id: 'binary-prog-compares',
      title: '统计二分查找的比较次数',
      level: '进阶',
      prompt: '读入一个升序排列的数组和一个目标值，用二分查找查找它，并输出整个过程中比较了多少次。每访问一次中点元素算一次比较。',
      io: '输入：第一行一个整数 n；第二行 n 个升序排列的整数；第三行一个整数 target。\n输出：一个整数，表示比较次数。',
      hint: '在取到中点、拿它和 target 比较的那一步，让计数器加 1。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    int target;
    cin >> target;

    int compares = 0;
    // TODO: 用二分查找 target，每比较一次就让 compares 加 1

    cout << compares << endl;
    return 0;
}
`,
      tests: [
        { label: '能找到', input: '6\n1 3 5 7 9 11\n7\n', expected: '3' },
        { label: '找不到', input: '6\n1 3 5 7 9 11\n4\n', expected: '3' },
        { label: '一次就命中', input: '1\n5\n5\n', expected: '1' }
      ]
    },
    {
      id: 'binary-prog-lower',
      title: '求目标值的插入位置',
      level: '挑战',
      prompt: '读入一个升序排列的数组和一个目标值，输出把这个目标值插入数组后仍保持升序的位置。如果数组中已经有相同的值，插到它们前面。',
      io: '输入：第一行一个整数 n；第二行 n 个升序排列的整数；第三行一个整数 target。\n输出：一个整数，表示插入位置（从 0 开始）。',
      hint: '查找区间用 [left, right) 的写法，找到第一个大于等于 target 的位置；循环结束时 left 就是答案。',
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    int target;
    cin >> target;

    int pos = 0;
    // TODO: 用二分查找求出 target 应该插入的位置，存到 pos

    cout << pos << endl;
    return 0;
}
`,
      tests: [
        { label: '插在中间', input: '6\n1 3 5 7 9 11\n6\n', expected: '3' },
        { label: '插在最前面', input: '6\n1 3 5 7 9 11\n1\n', expected: '0' },
        { label: '插在最后面', input: '6\n1 3 5 7 9 11\n12\n', expected: '6' }
      ]
    }
  ]
};

ALGORITHM_IDS.forEach((id) => {
  ALGORITHMS[id].programming = PROGRAMMING_PROBLEMS[id] || [];
});
const elements = {
  bars: document.getElementById('bars'),
  animationBadges: document.getElementById('animationBadges'),
  stepCounter: document.getElementById('stepCounter'),
  stepTitle: document.getElementById('stepTitle'),
  stepDescription: document.getElementById('stepDescription'),
  previousStep: document.getElementById('previousStep'),
  playButton: document.getElementById('playButton'),
  nextStep: document.getElementById('nextStep'),
  resetAnimation: document.getElementById('resetAnimation'),
  speedRange: document.getElementById('speedRange'),
  speedLabel: document.getElementById('speedLabel'),
  arrayInput: document.getElementById('arrayInput'),
  arrayInputLabel: document.getElementById('arrayInputLabel'),
  applyArray: document.getElementById('applyArray'),
  targetField: document.getElementById('targetField'),
  targetInput: document.getElementById('targetInput'),
  presetRow: document.getElementById('presetRow'),
  copyCode: document.getElementById('copyCode'),
  codeViewer: document.getElementById('codeViewer'),
  codeFilename: document.getElementById('codeFilename'),
  codeHeading: document.getElementById('codeHeading'),
  codeIntro: document.getElementById('codeIntro'),
  codeLanguage: document.getElementById('codeLanguage'),
  complexityGrid: document.getElementById('complexityGrid'),
  exerciseList: document.getElementById('exerciseList'),
  exerciseHeading: document.getElementById('exerciseHeading'),
  questionCount: document.getElementById('questionCount'),
  statAccuracy: document.getElementById('statAccuracy'),
  statAttempts: document.getElementById('statAttempts'),
  statCorrect: document.getElementById('statCorrect'),
  statFirstAccuracy: document.getElementById('statFirstAccuracy'),
  accuracyRing: document.getElementById('accuracyRing'),
  sidebarAttempts: document.getElementById('sidebarAttempts'),
  sidebarAccuracy: document.getElementById('sidebarAccuracy'),
  statsScope: document.getElementById('statsScope'),
  logForm: document.getElementById('logForm'),
  logNote: document.getElementById('logNote'),
  logLabel: document.getElementById('logLabel'),
  logList: document.getElementById('logList'),
  clearData: document.getElementById('clearData'),
  saveStatus: document.getElementById('saveStatus'),
  toast: document.getElementById('toast'),
  sidebar: document.getElementById('sidebar'),
  sidebarToggle: document.getElementById('sidebarToggle'),
  sidebarBackdrop: document.getElementById('sidebarBackdrop'),
  breadcrumbTitle: document.getElementById('breadcrumbTitle'),
  heroEyebrow: document.getElementById('heroEyebrow'),
  heroTitle: document.getElementById('heroTitle'),
  heroDescription: document.getElementById('heroDescription'),
  heroMeta: document.getElementById('heroMeta'),
  lessonKicker: document.getElementById('lessonKicker'),
  lessonTitle: document.getElementById('lessonTitle'),
  lessonContent: document.getElementById('lessonContent'),
  visualizerTitle: document.getElementById('visualizerTitle'),
  presets: Array.from(document.querySelectorAll('.preset-button')),
  navButtons: Array.from(document.querySelectorAll('.algorithm-link')),
  programmingCounter: document.getElementById('programmingCounter'),
  problemTabs: document.getElementById('problemTabs'),
  problemTitle: document.getElementById('problemTitle'),
  problemMeta: document.getElementById('problemMeta'),
  problemPrompt: document.getElementById('problemPrompt'),
  problemIo: document.getElementById('problemIo'),
  sampleList: document.getElementById('sampleList'),
  problemHint: document.getElementById('problemHint'),
  codeInput: document.getElementById('codeInput'),
  submitCode: document.getElementById('submitCode'),
  fillTemplate: document.getElementById('fillTemplate'),
  clearCode: document.getElementById('clearCode'),
  toggleHint: document.getElementById('toggleHint'),
  runStatus: document.getElementById('runStatus'),
  verdict: document.getElementById('verdict'),
  verdictHead: document.getElementById('verdictHead'),
  testList: document.getElementById('testList')
};

let state = loadState();
let currentAlgorithmId = 'bubble';
let steps = [];
let currentStepIndex = 0;
let playTimer = null;
let isPlaying = false;
let currentMinValue = 0;
let currentMaxValue = 1;
let selectedAnswers = new Map();
let resolvedExercises = new Set();
let lastResults = new Map();
let animationLoggedForAlgorithm = new Set();
let codeLineElements = [];
let toastTimer = null;
let saveStatusTimer = null;
let currentProgrammingIndex = 0;
let programmingWorkerSource = null;
let programmingCodeSaveTimer = null;
let programmingRunning = false;

function createRandomArray(length) {
  return Array.from({ length }, () => Math.floor(Math.random() * 90) + 5);
}

function createProgressState() {
  const progress = {};
  ALGORITHM_IDS.forEach((id) => {
    progress[id] = { viewedIntro: false, animationStarted: false, completedAnimation: false };
  });
  return progress;
}

function createDefaultState() {
  return { attempts: [], logs: [], progress: createProgressState(), programming: {} };
}

function loadState() {
  const fallback = createDefaultState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return fallback;
    }

    const parsed = JSON.parse(raw);
    const progress = createProgressState();
    const storedProgress = parsed && parsed.progress ? parsed.progress : {};

    ALGORITHM_IDS.forEach((id) => {
      const stored = storedProgress[id] || {};
      progress[id] = {
        viewedIntro: Boolean(stored.viewedIntro),
        animationStarted: Boolean(stored.animationStarted),
        completedAnimation: Boolean(stored.completedAnimation)
      };
    });

    return {
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
      logs: Array.isArray(parsed.logs) ? parsed.logs : [],
      progress,
      programming: parsed.programming && typeof parsed.programming === 'object' ? parsed.programming : {}
    };
  } catch (error) {
    console.warn('无法读取本地学习记录：', error);
    return fallback;
  }
}

function persistState() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    elements.saveStatus.classList.add('is-saving');
    window.clearTimeout(saveStatusTimer);
    saveStatusTimer = window.setTimeout(() => {
      elements.saveStatus.classList.remove('is-saving');
    }, 280);
  } catch (error) {
    console.warn('无法保存本地学习记录：', error);
    showToast('浏览器阻止了本地保存，请检查隐私设置。');
  }
}

function createId(prefix) {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return `${prefix}-${window.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatClock(timestamp) {
  return new Intl.DateTimeFormat('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(timestamp));
}

function formatDate(timestamp) {
  return new Intl.DateTimeFormat('zh-CN', { month: '2-digit', day: '2-digit' }).format(new Date(timestamp));
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => elements.toast.classList.remove('is-visible'), 2400);
}

function generateBubbleSteps(source) {
  const array = [...source];
  const generated = [];
  let comparisons = 0;
  let swaps = 0;

  generated.push({
    type: 'init', array: [...array], compare: [], swap: [], sortedFrom: array.length,
    metrics: { comparisons, swaps }, codeLine: 6, title: '准备开始',
    description: '从左到右比较相邻元素，较大的值会向右移动。'
  });

  for (let i = 0; i < array.length - 1; i += 1) {
    let swapped = false;

    generated.push({
      type: 'pass-start', array: [...array], compare: [], swap: [], sortedFrom: array.length - i,
      metrics: { comparisons, swaps }, codeLine: 7, title: `第 ${i + 1} 轮开始`,
      description: `本轮只需检查前 ${array.length - i} 个元素。`
    });

    for (let j = 0; j < array.length - i - 1; j += 1) {
      comparisons += 1;
      const needsSwap = array[j] > array[j + 1];

      generated.push({
        type: 'compare', array: [...array], compare: [j, j + 1], swap: [], sortedFrom: array.length - i,
        metrics: { comparisons, swaps }, codeLine: 11, title: `比较 a[${j}] 与 a[${j + 1}]`,
        description: `${array[j]} 和 ${array[j + 1]}：${needsSwap ? '左边更大，需要交换。' : '顺序正确，不交换。'}`
      });

      if (needsSwap) {
        const leftValue = array[j];
        const rightValue = array[j + 1];
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;
        swaps += 1;

        generated.push({
          type: 'swap', array: [...array], compare: [j, j + 1], swap: [j, j + 1], sortedFrom: array.length - i,
          metrics: { comparisons, swaps }, codeLine: 12, title: `交换 ${leftValue} 和 ${rightValue}`,
          description: `${leftValue} 与 ${rightValue} 互换位置，较大的值继续向右移动。`
        });
      }
    }

    generated.push({
      type: 'pass-end', array: [...array], compare: [], swap: [], sortedFrom: array.length - i - 1,
      metrics: { comparisons, swaps }, codeLine: 16, title: `第 ${i + 1} 轮结束`,
      description: `位置 ${array.length - i - 1} 已经放入本轮最大值。`
    });

    if (!swapped) {
      generated.push({
        type: 'early-exit', array: [...array], compare: [], swap: [], sortedFrom: 0,
        metrics: { comparisons, swaps }, codeLine: 16, title: '提前结束',
        description: '本轮没有发生交换，说明数组已经有序。'
      });
      break;
    }
  }

  generated.push({
    type: 'done', array: [...array], compare: [], swap: [], sortedFrom: 0,
    metrics: { comparisons, swaps }, codeLine: 18, title: '排序完成',
    description: `共比较 ${comparisons} 次，交换 ${swaps} 次。`
  });

  return generated;
}

function generateSelectionSteps(source) {
  const array = [...source];
  const generated = [];
  let comparisons = 0;
  let swaps = 0;

  generated.push({
    type: 'init', array: [...array], compare: [], swap: [], sortedPrefix: 0,
    metrics: { comparisons, swaps }, codeLine: 6, title: '准备开始',
    description: '每轮从未排序区间里找出最小值。'
  });

  for (let i = 0; i < array.length - 1; i += 1) {
    let minIndex = i;

    generated.push({
      type: 'pass-start', array: [...array], compare: [minIndex], swap: [], sortedPrefix: i,
      metrics: { comparisons, swaps }, codeLine: 8, title: `第 ${i + 1} 轮开始`,
      description: `假设位置 ${i} 的元素是当前最小值。`
    });

    for (let j = i + 1; j < array.length; j += 1) {
      comparisons += 1;
      const foundSmaller = array[j] < array[minIndex];

      generated.push({
        type: 'compare', array: [...array], compare: [minIndex, j], swap: [], sortedPrefix: i,
        metrics: { comparisons, swaps }, codeLine: 11, title: `比较 a[${j}] 与最小值 a[${minIndex}]`,
        description: foundSmaller ? `${array[j]} 更小，更新最小值下标。` : `${array[j]} 不小于当前最小值，继续向右扫描。`
      });

      if (foundSmaller) {
        minIndex = j;
        generated.push({
          type: 'new-min', array: [...array], compare: [minIndex], swap: [], sortedPrefix: i,
          metrics: { comparisons, swaps }, codeLine: 12, title: `新的最小值是 ${array[minIndex]}`,
          description: `记录 minIndex = ${minIndex}，后续继续与它比较。`
        });
      }
    }

    if (minIndex !== i) {
      const leftValue = array[i];
      const rightValue = array[minIndex];
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      swaps += 1;

      generated.push({
        type: 'swap', array: [...array], compare: [i, minIndex], swap: [i, minIndex], sortedPrefix: i + 1,
        metrics: { comparisons, swaps }, codeLine: 16, title: `交换 ${leftValue} 和 ${rightValue}`,
        description: `最小值来到位置 ${i}，已排序前缀增加 1。`
      });
    } else {
      generated.push({
        type: 'pass-end', array: [...array], compare: [i], swap: [], sortedPrefix: i + 1,
        metrics: { comparisons, swaps }, codeLine: 15, title: `位置 ${i} 已经正确`,
        description: '最小值本来就在区间起点，本轮不交换。'
      });
    }
  }

  generated.push({
    type: 'done', array: [...array], compare: [], swap: [], sortedPrefix: array.length,
    metrics: { comparisons, swaps }, codeLine: 19, title: '排序完成',
    description: `共比较 ${comparisons} 次，交换 ${swaps} 次。`
  });

  return generated;
}

function generateInsertionSteps(source) {
  const array = [...source];
  const generated = [];
  let comparisons = 0;
  let moves = 0;

  generated.push({
    type: 'init', array: [...array], compare: [], swap: [], sortedPrefix: 1,
    metrics: { comparisons, moves }, codeLine: 6, title: '准备开始',
    description: '第一个元素视为已经有序。'
  });

  for (let i = 1; i < array.length; i += 1) {
    const key = array[i];
    let j = i - 1;

    generated.push({
      type: 'pass-start', array: [...array], compare: [i], swap: [], sortedPrefix: i,
      keyValue: key, metrics: { comparisons, moves }, codeLine: 7, title: `处理元素 ${key}`,
      description: `左侧前 ${i} 个元素已经有序，现在寻找 key 的插入位置。`
    });

    generated.push({
      type: 'key-picked', array: [...array], compare: [i], swap: [], sortedPrefix: i,
      keyValue: key, metrics: { comparisons, moves }, codeLine: 8, title: `取出 key = ${key}`,
      description: `从位置 ${i - 1} 开始向左比较。`
    });

    while (j >= 0) {
      comparisons += 1;
      const shouldShift = array[j] > key;

      generated.push({
        type: 'compare', array: [...array], compare: [j], swap: [], sortedPrefix: i,
        keyValue: key, metrics: { comparisons, moves }, codeLine: 10, title: `比较 a[${j}] = ${array[j]} 与 key = ${key}`,
        description: shouldShift ? '左侧元素更大，需要向右移动。' : '左侧元素不大于 key，插入位置已经找到。'
      });

      if (!shouldShift) {
        break;
      }

      array[j + 1] = array[j];
      moves += 1;

      generated.push({
        type: 'move', array: [...array], compare: [j], swap: [j + 1], sortedPrefix: i,
        keyValue: key, metrics: { comparisons, moves }, codeLine: 11, title: `把 ${array[j]} 向右移动`,
        description: `位置 ${j + 1} 暂时空出，继续检查左侧。`
      });

      j -= 1;
    }

    array[j + 1] = key;

    generated.push({
      type: 'insert', array: [...array], compare: [j + 1], swap: [], sortedPrefix: i + 1,
      keyValue: key, metrics: { comparisons, moves }, codeLine: 14, title: `把 ${key} 插入位置 ${j + 1}`,
      description: `前 ${i + 1} 个元素重新保持有序。`
    });
  }

  generated.push({
    type: 'done', array: [...array], compare: [], swap: [], sortedPrefix: array.length,
    metrics: { comparisons, moves }, codeLine: 16, title: '排序完成',
    description: `共比较 ${comparisons} 次，移动 ${moves} 次。`
  });

  return generated;
}

function generateBinarySearchSteps(source, targetValue) {
  const array = [...source].sort((a, b) => a - b);
  const target = Number(targetValue);
  const generated = [];
  let left = 0;
  let right = array.length - 1;
  let probes = 0;

  const makeExcluded = (lo, hi) => {
    const excluded = [];
    for (let index = 0; index < array.length; index += 1) {
      if (index < lo || index > hi) {
        excluded.push(index);
      }
    }
    return excluded;
  };

  generated.push({
    type: 'init', array: [...array], compare: [], found: [], range: [0, array.length - 1], excluded: [],
    metrics: { probes, rangeSize: array.length }, codeLine: 6, title: `查找目标 ${target}`,
    description: '从包含整个数组的闭区间开始搜索。'
  });

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    probes += 1;

    generated.push({
      type: 'mid', array: [...array], compare: [mid], found: [], range: [left, right],
      excluded: makeExcluded(left, right), metrics: { probes, rangeSize: right - left + 1 },
      codeLine: 10, title: `检查中点 a[${mid}] = ${array[mid]}`,
      description: `当前搜索区间是 [${left}, ${right}]。`
    });

    if (array[mid] === target) {
      generated.push({
        type: 'done', array: [...array], compare: [], found: [mid], range: [left, right],
        excluded: makeExcluded(left, right), metrics: { probes, rangeSize: right - left + 1 },
        codeLine: 13, title: `找到目标 ${target}`,
        description: `目标值位于索引 ${mid}，共检查 ${probes} 次。`
      });
      return generated;
    }

    if (array[mid] < target) {
      generated.push({
        type: 'branch', array: [...array], compare: [mid], found: [], range: [left, right],
        excluded: makeExcluded(left, right), metrics: { probes, rangeSize: right - left + 1 },
        codeLine: 15, title: `${array[mid]} < ${target}`,
        description: '中点小于目标，左半部分和 mid 都可以排除。'
      });

      left = mid + 1;
      generated.push({
        type: 'range-update', array: [...array], compare: [], found: [], range: [left, right],
        excluded: makeExcluded(left, right), metrics: { probes, rangeSize: Math.max(0, right - left + 1) },
        codeLine: 16, title: `新区间 [${left}, ${right}]`,
        description: '继续在右半部分查找。'
      });
    } else {
      generated.push({
        type: 'branch', array: [...array], compare: [mid], found: [], range: [left, right],
        excluded: makeExcluded(left, right), metrics: { probes, rangeSize: right - left + 1 },
        codeLine: 18, title: `${array[mid]} > ${target}`,
        description: '中点大于目标，右半部分和 mid 都可以排除。'
      });

      right = mid - 1;
      generated.push({
        type: 'range-update', array: [...array], compare: [], found: [], range: [left, right],
        excluded: makeExcluded(left, right), metrics: { probes, rangeSize: Math.max(0, right - left + 1) },
        codeLine: 18, title: `新区间 [${left}, ${right}]`,
        description: '继续在左半部分查找。'
      });
    }
  }

  generated.push({
    type: 'done', array: [...array], compare: [], found: [], range: [left, right],
    excluded: array.map((_, index) => index), metrics: { probes, rangeSize: 0 },
    codeLine: 22, title: '目标不存在', description: `搜索区间已经为空，共检查 ${probes} 次。`
  });

  return generated;
}

function getCurrentAlgorithm() {
  return ALGORITHMS[currentAlgorithmId];
}

function renderLesson(algorithm) {
  elements.lessonKicker.textContent = algorithm.lesson.kicker;
  elements.lessonTitle.textContent = algorithm.lesson.title;
  elements.lessonContent.innerHTML = `
    <p class="lead">${algorithm.lesson.lead}</p>
    <div class="concept-grid">
      ${algorithm.lesson.concepts.map((concept, index) => `
        <div class="concept-item">
          <span class="concept-number">${index + 1}</span>
          <div>
            <strong>${concept.title}</strong>
            <p>${concept.text}</p>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="insight-box">
      <span class="insight-label">循环不变量</span>
      <p>${algorithm.lesson.invariant}</p>
    </div>
  `;
}

function renderCode(algorithm) {
  elements.codeHeading.textContent = algorithm.code.heading;
  elements.codeIntro.textContent = algorithm.code.intro;
  elements.codeFilename.textContent = algorithm.code.filename;
  elements.codeLanguage.textContent = 'C++17';

  elements.codeViewer.innerHTML = algorithm.code.lines.map((line, index) =>
    `<div class="code-line" data-line="${index + 1}"><span class="line-no">${index + 1}</span><code>${line}</code></div>`
  ).join('');

  codeLineElements = Array.from(elements.codeViewer.querySelectorAll('.code-line'));
}

function renderComplexity(algorithm) {
  elements.complexityGrid.innerHTML = algorithm.complexity.map((item) => `
    <div>
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <p>${item.description}</p>
    </div>
  `).join('');
}

function renderHero(algorithm) {
  elements.breadcrumbTitle.textContent = algorithm.title;
  elements.heroEyebrow.textContent = algorithm.eyebrow;
  elements.heroTitle.textContent = algorithm.title;
  elements.heroDescription.textContent = algorithm.heroDescription;
  elements.heroMeta.innerHTML = algorithm.meta.map((item) => `<span>${item}</span>`).join('');
  elements.visualizerTitle.textContent = algorithm.visual.title;
  elements.arrayInputLabel.textContent = algorithm.visual.inputLabel;
  elements.statsScope.textContent = algorithm.title;
  elements.exerciseHeading.textContent = `检查${algorithm.title}理解`;
  elements.questionCount.textContent = `${algorithm.exercises.length} 题`;
  elements.logLabel.textContent = `记录关于“${algorithm.title}”的问题、思路或需要回看的地方`;
  elements.logNote.placeholder = `例如：${algorithm.title}中的边界条件还需要再确认。`;
}

function renderAlgorithmNav() {
  elements.navButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.topic === currentAlgorithmId);
  });

  ALGORITHM_IDS.forEach((id) => {
    const dot = document.querySelector(`[data-status="${id}"]`);
    const progress = state.progress[id];
    if (!dot || !progress) {
      return;
    }

    const attemptCount = state.attempts.filter((attempt) => attempt.algorithmId === id).length;
    dot.classList.toggle('is-completed', Boolean(progress.completedAnimation));
    dot.classList.toggle('is-started', !progress.completedAnimation && (progress.animationStarted || attemptCount > 0));
    dot.title = progress.completedAnimation
      ? '动画已完成'
      : (progress.animationStarted || attemptCount > 0 ? '学习中' : '可学习');
  });
}

function initializeBars(values) {
  currentMinValue = Math.min(...values);
  currentMaxValue = Math.max(...values);

  elements.bars.innerHTML = values.map((value, index) => `
    <div class="bar-wrap">
      <div class="bar" data-index="${index}" aria-label="位置 ${index}，值 ${value}">
        <span class="bar-value">${value}</span>
      </div>
      <span class="bar-index">${index}</span>
    </div>
  `).join('');
}

function getBarHeight(value) {
  const span = currentMaxValue - currentMinValue;
  if (span === 0) {
    return 54;
  }
  return 12 + ((value - currentMinValue) / span) * 84;
}

function renderBars(step) {
  const wraps = Array.from(elements.bars.children);
  const compareIndices = new Set(step.compare || []);
  const swapIndices = new Set(step.swap || []);
  const excludedIndices = new Set(step.excluded || []);
  const foundIndices = new Set(step.found || []);
  const range = step.range;

  wraps.forEach((wrap, index) => {
    const bar = wrap.querySelector('.bar');
    const barValue = wrap.querySelector('.bar-value');
    const value = step.array[index];
    const isSorted = typeof step.sortedPrefix === 'number'
      ? index < step.sortedPrefix
      : (typeof step.sortedFrom === 'number' ? index >= step.sortedFrom : false);
    const isInRange = Array.isArray(range) && index >= range[0] && index <= range[1];

    bar.style.height = `${getBarHeight(value)}%`;
    bar.classList.toggle('is-compare', compareIndices.has(index));
    bar.classList.toggle('is-swap', swapIndices.has(index));
    bar.classList.toggle('is-sorted', isSorted);
    bar.classList.toggle('is-in-range', isInRange);
    bar.classList.toggle('is-excluded', excludedIndices.has(index));
    bar.classList.toggle('is-found', foundIndices.has(index));
    bar.setAttribute('aria-label', `位置 ${index}，值 ${value}`);
    barValue.textContent = value;
  });
}

function highlightCodeLine(lineNumber) {
  codeLineElements.forEach((line) => {
    line.classList.toggle('is-active', Number(line.dataset.line) === lineNumber);
  });
}

function renderMetrics(step) {
  const algorithm = getCurrentAlgorithm();
  elements.animationBadges.innerHTML = algorithm.visual.metrics.map((metric) => {
    const value = step.metrics && typeof step.metrics[metric.key] === 'number'
      ? step.metrics[metric.key]
      : 0;
    return `<span>${metric.label} <b>${value}</b></span>`;
  }).join('');
}

function renderStep(index) {
  if (!steps.length) {
    return;
  }

  currentStepIndex = Math.max(0, Math.min(index, steps.length - 1));
  const step = steps[currentStepIndex];
  const algorithm = getCurrentAlgorithm();

  renderBars(step);
  highlightCodeLine(step.codeLine);
  renderMetrics(step);

  elements.stepCounter.textContent = `${currentStepIndex + 1} / ${steps.length}`;
  elements.stepTitle.textContent = step.title;
  elements.stepDescription.textContent = step.description;
  elements.previousStep.disabled = currentStepIndex === 0;
  elements.nextStep.disabled = currentStepIndex === steps.length - 1;

  if (step.type === 'done' && !animationLoggedForAlgorithm.has(currentAlgorithmId)) {
    animationLoggedForAlgorithm.add(currentAlgorithmId);
    const progress = state.progress[currentAlgorithmId];

    if (!progress.completedAnimation) {
      progress.completedAnimation = true;
      addLog('动画', `${algorithm.title}动画完成`, `${step.description} 练习数据：${step.array.join(', ')}。`);
    } else {
      persistState();
    }

    renderAlgorithmNav();
  }
}

function stopPlaying() {
  window.clearTimeout(playTimer);
  playTimer = null;
  isPlaying = false;
  elements.playButton.textContent = '▶ 播放';
}

function getPlaybackDelay() {
  const speed = Number(elements.speedRange.value);
  return 1080 - speed * 90;
}

function setCurrentStep(index) {
  renderStep(index);
}

function playNextStep() {
  if (!isPlaying) {
    return;
  }

  if (currentStepIndex >= steps.length - 1) {
    stopPlaying();
    return;
  }

  setCurrentStep(currentStepIndex + 1);
  if (currentStepIndex >= steps.length - 1) {
    stopPlaying();
    return;
  }

  playTimer = window.setTimeout(playNextStep, getPlaybackDelay());
}

function togglePlayback() {
  if (isPlaying) {
    stopPlaying();
    return;
  }

  if (currentStepIndex >= steps.length - 1) {
    setCurrentStep(0);
  }

  state.progress[currentAlgorithmId].animationStarted = true;
  persistState();
  renderAlgorithmNav();
  isPlaying = true;
  elements.playButton.textContent = 'Ⅱ 暂停';
  playTimer = window.setTimeout(playNextStep, Math.min(320, getPlaybackDelay()));
}

function parseArrayInput() {
  const raw = elements.arrayInput.value.trim();
  const parts = raw.split(/[\s,，]+/).filter(Boolean);

  if (parts.length < 2 || parts.length > 12) {
    throw new Error('请输入 2 到 12 个整数。');
  }

  const values = parts.map((part) => Number(part));
  const invalid = values.some((value) => !Number.isInteger(value) || value < -999 || value > 999);

  if (invalid) {
    throw new Error('数组中只能包含 -999 到 999 之间的整数。');
  }

  return values;
}

function parseTargetInput() {
  const target = Number(elements.targetInput.value);
  if (!Number.isInteger(target) || target < -999 || target > 999) {
    throw new Error('目标值必须是 -999 到 999 之间的整数。');
  }
  return target;
}

function normalizeValuesForAlgorithm(values) {
  if (currentAlgorithmId === 'binary') {
    return [...values].sort((a, b) => a - b);
  }
  return [...values];
}

function applyArray(values, options = {}) {
  stopPlaying();
  const algorithm = getCurrentAlgorithm();
  const normalized = normalizeValuesForAlgorithm(values);
  const target = algorithm.kind === 'search'
    ? (typeof options.target === 'number' ? options.target : parseTargetInput())
    : undefined;

  steps = algorithm.generateSteps(normalized, target);
  initializeBars(normalized);
  elements.arrayInput.value = normalized.join(', ');

  if (algorithm.kind === 'search') {
    elements.targetInput.value = target;
  }

  setCurrentStep(0);

  if (options.sourceLabel) {
    showToast(`${options.sourceLabel}已生成，共 ${steps.length} 个步骤。`);
  }
}

function applyCurrentInput() {
  try {
    const values = parseArrayInput();
    const target = currentAlgorithmId === 'binary' ? parseTargetInput() : undefined;
    applyArray(values, { target });
  } catch (error) {
    showToast(error.message);
  }
}

function applyPreset(presetName) {
  const algorithm = getCurrentAlgorithm();
  const preset = algorithm.presets[presetName];
  if (!preset) {
    return;
  }

  const result = preset();
  applyArray(result.values, { target: result.target, sourceLabel: '预设数据' });
}

function renderVisualControls(algorithm) {
  elements.targetField.hidden = algorithm.kind !== 'search';
  elements.presetRow.hidden = false;
  elements.arrayInput.value = algorithm.visual.defaultArray.join(', ');
  elements.targetInput.value = typeof algorithm.visual.defaultTarget === 'number'
    ? algorithm.visual.defaultTarget
    : '';
}

function getQuestionStats(exerciseId) {
  const attempts = state.attempts.filter((attempt) => attempt.exerciseId === exerciseId);
  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : null;
  return { attempts: attempts.length, correct, accuracy };
}

function renderExercises() {
  const algorithm = getCurrentAlgorithm();

  elements.exerciseList.innerHTML = algorithm.exercises.map((exercise, index) => {
    const stats = getQuestionStats(exercise.id);
    const selected = selectedAnswers.get(exercise.id);
    const result = lastResults.get(exercise.id);
    const isResolved = resolvedExercises.has(exercise.id);

    const options = exercise.options.map((option) => {
      const classes = ['option-button'];
      if (selected === option.key) {
        classes.push('is-selected');
      }
      if (result !== undefined) {
        if (option.key === exercise.answer) {
          classes.push('is-correct');
        } else if (selected === option.key) {
          classes.push('is-wrong');
        }
      }

      return `
        <button class="${classes.join(' ')}" type="button" data-option="${option.key}" ${isResolved ? 'disabled' : ''}>
          <span class="option-key">${option.key}</span>
          <span>${escapeHtml(option.text)}</span>
        </button>
      `;
    }).join('');

    const feedback = result === undefined
      ? ''
      : `<div class="feedback ${result ? 'is-correct' : 'is-wrong'}">
          <strong>${result ? '回答正确' : '回答错误'}</strong>
          正确答案是 ${exercise.answer}。${escapeHtml(exercise.explanation)}
        </div>`;

    const statsText = stats.attempts
      ? `尝试 ${stats.attempts} 次 · 答对 ${stats.correct} 次 · ${stats.accuracy}%`
      : '还没有作答记录';

    return `
      <section class="exercise-item" data-exercise-id="${exercise.id}">
        <div class="question-heading">
          <span class="question-number">${index + 1}</span>
          <strong>${escapeHtml(exercise.prompt)}</strong>
        </div>
        <div class="option-list">${options}</div>
        ${feedback}
        <div class="exercise-footer">
          <span class="attempt-meta">${statsText}</span>
          <button class="secondary-button" type="button" data-action="${isResolved ? 'retry' : 'submit'}">${isResolved ? '再答一次' : '提交答案'}</button>
        </div>
      </section>
    `;
  }).join('');
}

function findExercise(exerciseId) {
  for (const algorithm of Object.values(ALGORITHMS)) {
    const exercise = algorithm.exercises.find((item) => item.id === exerciseId);
    if (exercise) {
      return exercise;
    }
  }
  return null;
}

function submitExercise(exerciseId) {
  const exercise = findExercise(exerciseId);
  const selected = selectedAnswers.get(exerciseId);

  if (!exercise || !selected) {
    showToast('请先选择一个答案。');
    return;
  }

  const previousAttempts = state.attempts.filter((attempt) => attempt.exerciseId === exerciseId);
  const isCorrect = selected === exercise.answer;
  const isFirstAttempt = previousAttempts.length === 0;

  state.attempts.push({
    id: createId('attempt'),
    exerciseId,
    algorithmId: currentAlgorithmId,
    answer: selected,
    correctAnswer: exercise.answer,
    isCorrect,
    isFirstAttempt,
    attemptedAt: new Date().toISOString()
  });

  resolvedExercises.add(exerciseId);
  lastResults.set(exerciseId, isCorrect);
  renderStats();
  renderExercises();
  persistState();

  const algorithm = getCurrentAlgorithm();
  const questionNumber = algorithm.exercises.findIndex((item) => item.id === exerciseId) + 1;
  addLog(
    '练习',
    `${algorithm.title} · 第 ${questionNumber} 题 · ${isCorrect ? '回答正确' : '回答错误'}`,
    `你的答案：${selected}；正确答案：${exercise.answer}。${isCorrect ? '' : exercise.explanation}`
  );

  showToast(isCorrect ? '回答正确，已记录。' : '这次没有答对，已记录。');
}

function calculateStats(attempts) {
  const correct = attempts.filter((attempt) => attempt.isCorrect).length;
  const accuracy = attempts.length ? Math.round((correct / attempts.length) * 100) : null;
  const firstAttempts = attempts.filter((attempt) => attempt.isFirstAttempt);
  const firstCorrect = firstAttempts.filter((attempt) => attempt.isCorrect).length;
  const firstAccuracy = firstAttempts.length ? Math.round((firstCorrect / firstAttempts.length) * 100) : null;

  return { attempts: attempts.length, correct, accuracy, firstAccuracy };
}

function updateAccuracyRing(accuracy) {
  const degrees = accuracy === null ? 0 : accuracy * 3.6;
  elements.accuracyRing.style.background = `conic-gradient(var(--accent) ${degrees}deg, rgba(148, 163, 184, 0.12) ${degrees}deg)`;
}

function renderStats() {
  const currentAttempts = state.attempts.filter((attempt) => attempt.algorithmId === currentAlgorithmId);
  const currentStats = calculateStats(currentAttempts);
  const globalStats = calculateStats(state.attempts);
  const accuracyText = currentStats.accuracy === null ? '--' : `${currentStats.accuracy}%`;
  const firstAccuracyText = currentStats.firstAccuracy === null ? '--' : `${currentStats.firstAccuracy}%`;

  elements.statAccuracy.textContent = accuracyText;
  elements.statAttempts.textContent = currentStats.attempts;
  elements.statCorrect.textContent = currentStats.correct;
  elements.statFirstAccuracy.textContent = firstAccuracyText;
  elements.sidebarAttempts.textContent = globalStats.attempts;
  elements.sidebarAccuracy.textContent = globalStats.accuracy === null ? '--' : `${globalStats.accuracy}%`;
  updateAccuracyRing(currentStats.accuracy);
  renderAlgorithmNav();
}

function addLog(type, title, detail) {
  state.logs.unshift({
    id: createId('log'),
    algorithmId: currentAlgorithmId,
    type,
    title,
    detail,
    createdAt: new Date().toISOString()
  });
  state.logs = state.logs.slice(0, 80);
  persistState();
  renderLogs();
}

function renderLogs() {
  if (!state.logs.length) {
    elements.logList.innerHTML = '<li class="empty-log">还没有学习记录。完成动画或提交练习题后，这里会自动生成记录。</li>';
    return;
  }

  elements.logList.innerHTML = state.logs.map((log) => {
    const timestamp = new Date(log.createdAt).getTime();
    return `
      <li class="log-item">
        <time datetime="${escapeHtml(log.createdAt)}">${formatDate(timestamp)}<br>${formatClock(timestamp)}</time>
        <div>
          <strong>${escapeHtml(log.type)} · ${escapeHtml(log.title)}</strong>
          <p>${escapeHtml(log.detail || '')}</p>
        </div>
      </li>
    `;
  }).join('');
}

function updateSpeedLabel() {
  elements.speedLabel.textContent = `${elements.speedRange.value}×`;
}

async function copyCode() {
  const code = codeLineElements.map((line) => line.querySelector('code').textContent).join('\n');

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(code);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = code;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    showToast('C++ 代码已复制。');
  } catch (error) {
    console.warn('复制失败：', error);
    showToast('复制失败，请手动选择代码。');
  }
}

function closeSidebar() {
  elements.sidebar.classList.remove('is-open');
  elements.sidebarBackdrop.classList.remove('is-visible');
}

function clearLearningData() {
  const confirmed = window.confirm('确定清空全部答题记录和学习日志吗？此操作无法撤销。');
  if (!confirmed) {
    return;
  }

  state = createDefaultState();
  selectedAnswers = new Map();
  resolvedExercises = new Set();
  lastResults = new Map();
  animationLoggedForAlgorithm = new Set();
  currentProgrammingIndex = 0;
  persistState();
  renderStats();
  renderExercises();
  renderProgramming();
  renderLogs();
  renderAlgorithmNav();
  showToast('全部本地答题记录和学习日志已清空。');
}

function selectAlgorithm(algorithmId, options = {}) {
  if (!ALGORITHMS[algorithmId]) {
    return;
  }

  stopPlaying();
  currentAlgorithmId = algorithmId;
  state.progress[algorithmId].viewedIntro = true;
  persistState();

  const algorithm = ALGORITHMS[algorithmId];
  renderAlgorithmNav();
  renderHero(algorithm);
  renderLesson(algorithm);
  renderCode(algorithm);
  renderComplexity(algorithm);
  renderVisualControls(algorithm);

  currentProgrammingIndex = 0;

  const initialTarget = algorithm.kind === 'search' ? algorithm.visual.defaultTarget : undefined;
  applyArray(algorithm.visual.defaultArray, { target: initialTarget });
  renderExercises();
  renderProgramming();
  renderStats();
  renderLogs();

  if (options.updateHash !== false && window.location.hash.slice(1) !== algorithmId) {
    window.location.hash = algorithmId;
  }

  if (options.scroll !== false) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeSidebar();
}

// ===========================================================================
// 编程练习：粘贴代码 -> 在 Web Worker 中用 JSCPP 解释执行 -> 判题
// ===========================================================================

const JSCPP_WORKER_GLUE = [
  'self.onmessage = function (event) {',
  '  var data = event.data || {};',
  '  var output = "";',
  '  var error = null;',
  '  var exitCode = null;',
  '  try {',
  '    exitCode = JSCPP.run(data.code, data.input || "", {',
  '      stdio: { write: function (chunk) { output += chunk; } }',
  '    });',
  '  } catch (err) {',
  '    error = (err && err.message) ? err.message : String(err);',
  '  }',
  '  self.postMessage({ output: output, error: error, exitCode: exitCode });',
  '};'
].join('\n');

function getProgrammingProblems() {
  const algorithm = getCurrentAlgorithm();
  return (algorithm && algorithm.programming) ? algorithm.programming : [];
}

function getCurrentProblem() {
  const problems = getProgrammingProblems();
  if (!problems.length) {
    return null;
  }
  if (currentProgrammingIndex < 0 || currentProgrammingIndex >= problems.length) {
    currentProgrammingIndex = 0;
  }
  return problems[currentProgrammingIndex];
}

function getProgrammingEntry(problemId) {
  if (!state.programming || typeof state.programming !== 'object') {
    state.programming = {};
  }
  if (!state.programming[problemId] || typeof state.programming[problemId] !== 'object') {
    state.programming[problemId] = { code: null, solved: false, passed: 0, total: 0, updatedAt: null };
  }
  const entry = state.programming[problemId];
  if (typeof entry.code !== 'string' && entry.code !== null) {
    entry.code = null;
  }
  if (typeof entry.solved !== 'boolean') {
    entry.solved = false;
  }
  if (typeof entry.passed !== 'number') {
    entry.passed = 0;
  }
  if (typeof entry.total !== 'number') {
    entry.total = 0;
  }
  return entry;
}

function getProgrammingCode(problem) {
  const entry = getProgrammingEntry(problem.id);
  // 默认留空，让学生粘贴自己写好的代码；参考模板可通过「填入参考模板」按钮获取
  return typeof entry.code === 'string' ? entry.code : '';
}

function saveProgrammingCode(problemId, code) {
  const entry = getProgrammingEntry(problemId);
  entry.code = code;
  window.clearTimeout(programmingCodeSaveTimer);
  programmingCodeSaveTimer = window.setTimeout(() => persistState(), 400);
}

function normalizeOutput(value) {
  return String(value === null || value === undefined ? '' : value)
    .replace(/\r/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .join(' ');
}

function getProgrammingWorkerSource() {
  if (programmingWorkerSource) {
    return programmingWorkerSource;
  }
  const holder = document.getElementById('jscppSource');
  const library = holder ? holder.textContent : '';
  programmingWorkerSource = 'var JSCPP;\n' + library + '\n' + JSCPP_WORKER_GLUE;
  return programmingWorkerSource;
}

function runCodeInWorker(code, input, timeoutMs) {
  return new Promise((resolve) => {
    const source = getProgrammingWorkerSource();
    if (!source || source.length < 1000) {
      resolve({ error: 'C++ 解释器没有加载成功，请检查页面中的 jscppSource 代码块。' });
      return;
    }

    let objectUrl = null;
    let worker = null;
    try {
      const blob = new Blob([source], { type: 'application/javascript' });
      objectUrl = URL.createObjectURL(blob);
      worker = new Worker(objectUrl);
    } catch (error) {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      resolve({ error: '当前环境无法启动运行沙箱：' + (error && error.message ? error.message : error) });
      return;
    }

    let settled = false;
    let timer = null;

    const finish = (payload) => {
      if (settled) {
        return;
      }
      settled = true;
      if (timer) {
        window.clearTimeout(timer);
      }
      try {
        worker.terminate();
      } catch (error) {
        /* ignore */
      }
      URL.revokeObjectURL(objectUrl);
      resolve(payload);
    };

    timer = window.setTimeout(() => finish({ timeout: true }), timeoutMs);
    worker.onmessage = (event) => finish(event.data || {});
    worker.onerror = (event) => finish({ error: '运行环境出错：' + ((event && event.message) || '未知错误') });

    try {
      worker.postMessage({ code, input });
    } catch (error) {
      finish({ error: '无法把代码发送到运行沙箱：' + (error && error.message ? error.message : error) });
    }
  });
}

function humanizeProgrammingError(message) {
  const text = String(message || '').trim();
  if (!text) {
    return '程序没能正常运行，但没有返回具体原因。';
  }
  if (/parsing failure/i.test(text)) {
    return '代码有语法错误，没能通过解析。请对照下面的信息检查括号、分号和拼写：\n\n' + text;
  }
  if (/is not defined|referenceerror/i.test(text)) {
    return '用到了没有声明的变量或函数：\n\n' + text;
  }
  if (/unexpected/i.test(text)) {
    return '代码里出现了意料之外的写法：\n\n' + text;
  }
  return text;
}

function setRunStatus(text) {
  if (!elements.runStatus) {
    return;
  }
  elements.runStatus.textContent = text || '';
  elements.runStatus.classList.toggle('is-busy', Boolean(text));
}

function renderProgramming() {
  const problems = getProgrammingProblems();
  if (!elements.problemTabs) {
    return;
  }
  if (!problems.length) {
    elements.problemTabs.innerHTML = '';
    elements.problemTitle.textContent = '';
    elements.problemPrompt.textContent = '这个算法暂时还没有编程题。';
    elements.problemIo.textContent = '';
    elements.sampleList.innerHTML = '';
    elements.codeInput.value = '';
    elements.verdict.hidden = true;
    return;
  }

  if (currentProgrammingIndex >= problems.length) {
    currentProgrammingIndex = 0;
  }

  if (elements.programmingCounter) {
    elements.programmingCounter.textContent = problems.length + ' 题';
  }

  elements.problemTabs.innerHTML = problems.map((problem, index) => {
    const entry = getProgrammingEntry(problem.id);
    const classes = ['problem-tab'];
    if (index === currentProgrammingIndex) {
      classes.push('is-active');
    }
    if (entry.solved) {
      classes.push('is-solved');
    }
    return '<button class="' + classes.join(' ') + '" type="button" data-problem-index="' + index + '">' +
      '<span class="problem-tab-index">' + (index + 1) + '</span>' +
      '<span class="problem-tab-title">' + escapeHtml(problem.title) + '</span>' +
      (entry.solved ? '<span class="problem-tab-done">✓</span>' : '') +
      '</button>';
  }).join('');

  renderCurrentProblem();
}

function renderCurrentProblem() {
  const problem = getCurrentProblem();
  if (!problem) {
    return;
  }

  elements.problemTitle.textContent = problem.title;
  elements.problemMeta.innerHTML =
    '<span class="level-chip">' + escapeHtml(problem.level || '练习') + '</span>' +
    '<span class="test-chip">' + problem.tests.length + ' 组测试</span>';
  elements.problemPrompt.textContent = problem.prompt;
  elements.problemIo.textContent = problem.io;

  elements.sampleList.innerHTML = problem.tests.map((test, index) => {
    const label = test.label || ('样例 ' + (index + 1));
    return '<div class="sample">' +
      '<div class="sample-col">' +
        '<span class="sample-label">' + escapeHtml(label) + ' · 输入</span>' +
        '<pre>' + escapeHtml(test.input) + '</pre>' +
      '</div>' +
      '<div class="sample-col">' +
        '<span class="sample-label">期望输出</span>' +
        '<pre>' + escapeHtml(test.expected) + '</pre>' +
      '</div>' +
    '</div>';
  }).join('');

  elements.problemHint.textContent = problem.hint || '';
  elements.problemHint.hidden = !elements.toggleHint.checked;
  elements.codeInput.value = getProgrammingCode(problem);

  elements.verdict.hidden = true;
  elements.verdictHead.textContent = '';
  elements.verdictHead.className = 'verdict-head';
  elements.testList.innerHTML = '';
  setRunStatus('');
}

function selectProgrammingProblem(index) {
  const problems = getProgrammingProblems();
  if (index < 0 || index >= problems.length) {
    return;
  }
  currentProgrammingIndex = index;
  Array.from(elements.problemTabs.children).forEach((button, buttonIndex) => {
    button.classList.toggle('is-active', buttonIndex === index);
  });
  renderCurrentProblem();
}

function refreshProblemTabs() {
  const problems = getProgrammingProblems();
  Array.from(elements.problemTabs.children).forEach((button, index) => {
    const problem = problems[index];
    if (!problem) {
      return;
    }
    const entry = getProgrammingEntry(problem.id);
    button.classList.toggle('is-solved', Boolean(entry.solved));
    const existing = button.querySelector('.problem-tab-done');
    if (entry.solved && !existing) {
      const mark = document.createElement('span');
      mark.className = 'problem-tab-done';
      mark.textContent = '✓';
      button.appendChild(mark);
    } else if (!entry.solved && existing) {
      existing.remove();
    }
  });
}

function renderProgrammingResults(problem, results) {
  const total = problem.tests.length;
  const passed = results.filter((result) => result.verdict === 'pass').length;
  const fatal = results.find((result) => result.verdict === 'error' || result.verdict === 'timeout');
  const allPassed = !fatal && passed === total;

  elements.verdict.hidden = false;

  if (allPassed) {
    elements.verdictHead.className = 'verdict-head is-pass';
    elements.verdictHead.textContent = '全部通过  ' + passed + ' / ' + total + '  ✅';
  } else if (fatal) {
    elements.verdictHead.className = 'verdict-head is-warn';
    elements.verdictHead.textContent = fatal.verdict === 'timeout'
      ? '程序超时，没能完成判定'
      : '程序没能正常运行';
  } else {
    elements.verdictHead.className = 'verdict-head is-fail';
    elements.verdictHead.textContent = '未通过  ' + passed + ' / ' + total;
  }

  elements.testList.innerHTML = results.map((result, index) => {
    const icons = { pass: '✅', fail: '❌', error: '⚠️', timeout: '⏱️' };
    const icon = icons[result.verdict] || '•';
    const name = result.label || ('测试 ' + (index + 1));
    let body = '';

    if (result.verdict === 'pass') {
      body = '<div class="case-row"><span>你的输出</span><pre class="is-good">' +
        escapeHtml(String(result.actual || '').trim() || '(没有输出)') + '</pre></div>';
    } else if (result.verdict === 'fail') {
      body = '<div class="case-row"><span>你的输出</span><pre class="is-bad">' +
        escapeHtml(String(result.actual || '').trim() || '(没有输出)') + '</pre></div>' +
        '<div class="case-row"><span>期望输出</span><pre class="is-good">' +
        escapeHtml(result.expected) + '</pre></div>';
    } else {
      body = '<div class="case-row case-msg"><pre>' + escapeHtml(result.detail || '') + '</pre></div>';
    }

    return '<div class="test-case is-' + result.verdict + '">' +
      '<div class="case-head"><span>' + icon + '</span><strong>' + escapeHtml(name) + '</strong></div>' +
      body +
    '</div>';
  }).join('');
}

async function submitProgramming() {
  const problem = getCurrentProblem();
  if (!problem || programmingRunning) {
    return;
  }

  const code = elements.codeInput.value;
  if (!code.trim()) {
    showToast('请先粘贴或编写 C++ 代码。');
    return;
  }

  saveProgrammingCode(problem.id, code);
  programmingRunning = true;
  elements.submitCode.disabled = true;
  elements.verdict.hidden = true;

  const results = [];
  try {
    for (let index = 0; index < problem.tests.length; index += 1) {
      const test = problem.tests[index];
      setRunStatus('运行第 ' + (index + 1) + '/' + problem.tests.length + ' 组…');
      /* 让浏览器有机会刷新状态文字 */
      await new Promise((resolve) => window.setTimeout(resolve, 0));

      const outcome = await runCodeInWorker(code, test.input, RUN_TIMEOUT_MS);
      let result;

      if (outcome.timeout) {
        result = {
          label: test.label,
          expected: test.expected,
          actual: '',
          verdict: 'timeout',
          detail: '程序运行超过 ' + Math.round(RUN_TIMEOUT_MS / 1000) + ' 秒还没结束，可能写成了死循环。\n请检查 while / for 的结束条件，确认循环一定会停下来。'
        };
      } else if (outcome.error) {
        result = {
          label: test.label,
          expected: test.expected,
          actual: '',
          verdict: 'error',
          detail: humanizeProgrammingError(outcome.error)
        };
      } else {
        const actual = outcome.output || '';
        result = {
          label: test.label,
          expected: test.expected,
          actual,
          verdict: normalizeOutput(actual) === normalizeOutput(test.expected) ? 'pass' : 'fail',
          detail: ''
        };
      }

      results.push(result);
      if (result.verdict === 'error' || result.verdict === 'timeout') {
        break;
      }
    }
  } finally {
    programmingRunning = false;
    elements.submitCode.disabled = false;
    setRunStatus('');
  }

  renderProgrammingResults(problem, results);
  recordProgrammingAttempt(problem, results);
}

function recordProgrammingAttempt(problem, results) {
  const entry = getProgrammingEntry(problem.id);
  const total = problem.tests.length;
  const passed = results.filter((result) => result.verdict === 'pass').length;
  const allPassed = passed === total && results.length === total;
  const wasSolved = Boolean(entry.solved);

  entry.passed = passed;
  entry.total = total;
  entry.updatedAt = new Date().toISOString();
  if (allPassed) {
    entry.solved = true;
  }
  persistState();
  refreshProblemTabs();

  if (allPassed && !wasSolved) {
    addLog(
      '编程',
      getCurrentAlgorithm().title + ' · ' + problem.title + ' · 通过',
      '测试用例 ' + passed + '/' + total + ' 全部通过。'
    );
    showToast('全部测试通过，已记录到学习日志。');
  } else if (allPassed) {
    showToast('全部测试通过。');
  } else if (results.some((result) => result.verdict === 'error')) {
    showToast('代码没能通过解析，看看下方的错误提示。');
  } else if (results.some((result) => result.verdict === 'timeout')) {
    showToast('程序超时了，检查一下循环条件。');
  } else {
    showToast('还没有全部通过，看看「你的输出」和「期望输出」的差别。');
  }
}
function bindEvents() {
  elements.applyArray.addEventListener('click', applyCurrentInput);

  elements.arrayInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      applyCurrentInput();
    }
  });

  elements.targetInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      applyCurrentInput();
    }
  });

  elements.presets.forEach((button) => {
    button.addEventListener('click', () => applyPreset(button.dataset.preset));
  });

  elements.previousStep.addEventListener('click', () => {
    stopPlaying();
    setCurrentStep(currentStepIndex - 1);
  });

  elements.nextStep.addEventListener('click', () => {
    stopPlaying();
    state.progress[currentAlgorithmId].animationStarted = true;
    persistState();
    renderAlgorithmNav();
    setCurrentStep(currentStepIndex + 1);
  });

  elements.playButton.addEventListener('click', togglePlayback);

  elements.resetAnimation.addEventListener('click', () => {
    stopPlaying();
    setCurrentStep(0);
  });

  elements.speedRange.addEventListener('input', () => {
    updateSpeedLabel();
    if (isPlaying) {
      window.clearTimeout(playTimer);
      playTimer = window.setTimeout(playNextStep, getPlaybackDelay());
    }
  });

  elements.copyCode.addEventListener('click', copyCode);
  elements.clearData.addEventListener('click', clearLearningData);

  if (elements.problemTabs) {
    elements.problemTabs.addEventListener('click', (event) => {
      const button = event.target.closest('[data-problem-index]');
      if (!button) {
        return;
      }
      selectProgrammingProblem(Number(button.dataset.problemIndex));
    });

    elements.submitCode.addEventListener('click', submitProgramming);

    elements.fillTemplate.addEventListener('click', () => {
      const problem = getCurrentProblem();
      if (!problem) {
        return;
      }
      elements.codeInput.value = problem.template;
      saveProgrammingCode(problem.id, problem.template);
      showToast('已填入参考模板，可以照着补全。');
    });

    elements.clearCode.addEventListener('click', () => {
      const problem = getCurrentProblem();
      if (!problem) {
        return;
      }
      elements.codeInput.value = '';
      saveProgrammingCode(problem.id, '');
      elements.codeInput.focus();
    });

    elements.codeInput.addEventListener('input', () => {
      const problem = getCurrentProblem();
      if (!problem) {
        return;
      }
      saveProgrammingCode(problem.id, elements.codeInput.value);
    });

    elements.codeInput.addEventListener('keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        submitProgramming();
      }
    });

    elements.toggleHint.addEventListener('change', () => {
      elements.problemHint.hidden = !elements.toggleHint.checked;
    });
  }

  elements.exerciseList.addEventListener('click', (event) => {
    const exerciseItem = event.target.closest('.exercise-item');
    if (!exerciseItem) {
      return;
    }

    const exerciseId = exerciseItem.dataset.exerciseId;
    const optionButton = event.target.closest('.option-button');
    const actionButton = event.target.closest('[data-action]');

    if (optionButton && !resolvedExercises.has(exerciseId)) {
      selectedAnswers.set(exerciseId, optionButton.dataset.option);
      exerciseItem.querySelectorAll('.option-button').forEach((button) => {
        button.classList.toggle('is-selected', button === optionButton);
      });
      return;
    }

    if (!actionButton) {
      return;
    }

    if (actionButton.dataset.action === 'retry') {
      selectedAnswers.delete(exerciseId);
      resolvedExercises.delete(exerciseId);
      lastResults.delete(exerciseId);
      renderExercises();
      return;
    }

    submitExercise(exerciseId);
  });

  elements.logForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = elements.logNote.value.trim();

    if (!note) {
      showToast('请先写下一条学习记录。');
      return;
    }

    addLog('笔记', `${getCurrentAlgorithm().title} · 学习补充`, note);
    elements.logNote.value = '';
    showToast('学习日志已保存。');
  });

  elements.sidebarToggle.addEventListener('click', () => {
    elements.sidebar.classList.add('is-open');
    elements.sidebarBackdrop.classList.add('is-visible');
  });

  elements.sidebarBackdrop.addEventListener('click', closeSidebar);

  elements.navButtons.forEach((button) => {
    button.addEventListener('click', () => selectAlgorithm(button.dataset.topic));
  });

  window.addEventListener('hashchange', () => {
    const requested = window.location.hash.slice(1);
    if (ALGORITHMS[requested] && requested !== currentAlgorithmId) {
      selectAlgorithm(requested, { updateHash: false, scroll: false });
    }
  });
}

function initializeApp() {
  bindEvents();
  updateSpeedLabel();

  const requested = window.location.hash.slice(1);
  const initialId = ALGORITHMS[requested] ? requested : 'bubble';
  selectAlgorithm(initialId, { updateHash: false, scroll: false });
}

initializeApp();
