function mincost(arr) {
    if (arr.length === 1) return 0;

    // Min-heap helper functions
    const heapPush = (heap, val) => {
        heap.push(val);
        let i = heap.length - 1;
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (heap[parent] > heap[i]) {
                [heap[parent], heap[i]] = [heap[i], heap[parent]];
                i = parent;
            } else break;
        }
    };

    const heapPop = (heap) => {
        const top = heap[0];
        const last = heap.pop();
        if (heap.length > 0) {
            heap[0] = last;
            let i = 0;
            while (true) {
                let smallest = i;
                const left = 2 * i + 1;
                const right = 2 * i + 2;
                if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
                if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
                if (smallest !== i) {
                    [heap[smallest], heap[i]] = [heap[i], heap[smallest]];
                    i = smallest;
                } else break;
            }
        }
        return top;
    };

    // Build min-heap from arr
    const heap = [];
    for (const val of arr) heapPush(heap, val);

    let totalCost = 0;

    while (heap.length > 1) {
        const first = heapPop(heap);
        const second = heapPop(heap);
        const cost = first + second;
        totalCost += cost;
        heapPush(heap, cost);
    }

    return totalCost;
}

module.exports = mincost;