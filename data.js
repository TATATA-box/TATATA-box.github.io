const BLOG_POSTS = [
    {
        id: 1,
        title: "文档转换的瑞士军刀：Pandoc 实用指南",
        date: "2026-06-25",
        category: "Tools",
        tags: ["Pandoc", "Markdown", "Workflow"],
        summary: "Pandoc 是一款功能强大的开源文档格式转换工具。本文将深入讲解如何在 Windows/Mac 下通过 winget 或 Homebrew 安装并使用 Pandoc，展示 Markdown 与 Word/PDF/HTML 格式之间的转换流程，并提供图文步骤与常见问题解答。",
        content: `
            <p>在日常的学术写作、代码开发和技术分享中，我们经常需要在不同的文档格式之间进行切换。如果你想把 Markdown 笔记发给不写代码的导师，或者需要将大作业的 HTML 页面整理成 Word 报告，<strong>Pandoc</strong> 就是你最得力的助手。它被公认为“文档转换的瑞士军刀”。</p>
            
            <h3>一、 Pandoc 介绍</h3>
            <p>Pandoc 是由加州大学伯克利分校哲学教授 John MacFarlane 用 Haskell 开发的一款开源命令行工具。它支持在几乎所有已知的标记语言和文档格式之间进行双向转换。</p>
            
            <p><strong>Pandoc 支持的输入格式极其丰富：</strong>包括 Markdown、Word (.docx)、HTML、Text、LaTeX、EPUB、JSON 等，同样也支持将它们输出为对应的格式。用 Markdown 写内容，用 Pandoc 一键生成 Word 或 PDF 能够帮助我们省去在 Word 中反复调整格式的时间，极其适合科研论文写作及网页制作协作。</p>
            
            <h3>二、 Pandoc 安装详细步骤</h3>
            <p>对于 Windows 10/11 系统，我们可以使用 winget 命令行极其方便地完成安装：</p>
            
            <h4>步骤 1：打开终端</h4>
            <p>在桌面空白处鼠标右键点击，在弹出的菜单中选择<strong>「在终端中打开」</strong>。如果未直接显示，可以点击“显示更多选项”中寻找。</p>
            <div class="blog-img-container">
                <img src="assets/博客文章/pandoc使用指南/step/step1 打开终端.png" class="blog-inline-img" alt="在桌面右键打开终端">
                <div class="blog-img-caption">图 1: 在 Windows 桌面右键菜单打开终端</div>
            </div>
            
            <h4>步骤 2：输入并运行安装指令</h4>
            <p>在终端中复制并粘贴以下命令，然后按下回车键：</p>
            <pre><code>winget install --source winget --exact --id JohnMacFarlane.Pandoc</code></pre>
            <div class="blog-img-container">
                <img src="assets/博客文章/pandoc使用指南/step/step3 点击回车会自动安装.png" class="blog-inline-img" alt="自动下载与安装">
                <div class="blog-img-caption">图 2: 命令执行后，winget 将自动下载并安装 Pandoc</div>
            </div>
            
            <h4>步骤 3：验证安装</h4>
            <p>安装完成后，重新打开一个终端窗口，输入以下命令验证是否成功安装：</p>
            <pre><code>pandoc --version</code></pre>
            <div class="blog-img-container">
                <img src="assets/博客文章/pandoc使用指南/step/step4 输入pandoc--version验证是否安装成功.png" class="blog-inline-img" alt="验证版本号">
                <div class="blog-img-caption">图 3: 终端返回 Pandoc 版本号说明环境变量已配置完毕</div>
            </div>

            <h3>三、 Pandoc 转换格式实践</h3>
            <p>下面通过一个实际例子来学习如何将 Markdown 文件转换为 Word 格式：</p>
            
            <p>假设我们的工作目录下有一个写好的 <code>示例文件.md</code>，如图：</p>
            <div class="blog-img-container">
                <img src="assets/博客文章/pandoc使用指南/step/step5 假设某个需要转换文件格式的“示例文件”在“示例文件夹”中.png" class="blog-inline-img" alt="示例文件目录">
                <div class="blog-img-caption">图 4: 待转换的示例 Markdown 文件</div>
            </div>
            
            <p>我们在该文件夹的空白处右键选择<strong>「在终端中打开」</strong>，输入转换命令：</p>
            <pre><code>pandoc 示例文件.md -o 示例文件.docx</code></pre>
            <div class="blog-img-container">
                <img src="assets/博客文章/pandoc使用指南/step/step7 在终端中输入转换指令.png" class="blog-inline-img" alt="输入转换指令">
                <div class="blog-img-caption">图 5: 在对应的工作目录下执行格式转换</div>
            </div>
            
            <p>回车执行后，终端没有任何输出即代表成功。此时，文件夹下会自动生成转换好的 Word 格式文件，保留了标题层级、粗体、代码块及列表等全部排版格式：</p>
            <div class="blog-img-container">
                <img src="assets/博客文章/pandoc使用指南/step/step8 发现输出了转换格式的新文件.png" class="blog-inline-img" alt="转换后的 Word 文件">
                <div class="blog-img-caption">图 6: 自动生成的高质量 Docx 文档</div>
            </div>
            
            <h3>四、 常用转换命令一览表</h3>
            <ul>
                <li><strong>Markdown 转 Word</strong>: <code>pandoc input.md -o output.docx</code></li>
                <li><strong>Markdown 转 HTML 网页</strong>: <code>pandoc input.md -o output.html -s</code> (<code>-s</code> 表示生成含 Head 头的独立网页)</li>
                <li><strong>Word 转 Markdown</strong>: <code>pandoc input.docx -t markdown -o output.md</code></li>
                <li><strong>生成目录</strong>: <code>pandoc input.md -o output.docx --toc</code> (自动在文档开头生成目录)</li>
                <li><strong>章节自动编号</strong>: <code>pandoc input.md -o output.docx --toc --number-sections</code></li>
            </ul>
        `
    },
    {
        id: 2,
        title: "平面最近点对问题的分治法求解与算法设计",
        date: "2026-06-20",
        category: "Algorithms",
        tags: ["分治法", "算法设计", "计算几何"],
        summary: "本篇着重于最近点对问题的算法设计。详细探讨如何将平面点集通过 X 坐标中线划分为左右两半，求解子区间最近距离 d，并在合并阶段通过严谨的几何证明展示 strip 区域中“对于任意一点最多只需检查其后 7 个点”的优化机理。",
        content: `
            <p>平面最近点对问题（Closest Pair of Points Problem）是计算几何中的经典问题：在给定的无向平面点集 $S$ 中，寻找距离最近的两个点并计算其欧氏距离。如果使用蛮力法（Brute Force），双重循环遍历所有点对的复杂度高达 $O(N^2)$；而通过<strong>分治法（Divide and Conquer）</strong>，我们可以将复杂度降低到优秀的 $O(N \\log N)$。</p>
            
            <h3>一、 分治算法设计思想</h3>
            <p>分治法的核心框架非常符合“分而治之”的三步曲：</p>
            <ol>
                <li><strong>分解（Divide）</strong>：将所有点按照 X 坐标进行升序排列。取其中位数，用一条垂直线 $x = mid\\_x$ 将点集平分为左右两个子集 $S_L$ 和 $S_R$。</li>
                <li><strong>解决（Conquer）</strong>：递归地在 $S_L$ 和 $S_R$ 中求解最近点对，得到左半部分的最近距离 $d_L$ 和右半部分的最近距离 $d_R$。取两者的较小值 $d = \\min(d_L, d_R)$。</li>
                <li><strong>合并（Merge）</strong>：最近的点对可能一个在左半部分，一个在右半部分。我们需要在垂直分割线两侧宽度为 $2d$ 的带状区域（Strip）中，寻找跨越中线的潜在更近点对。</li>
            </ol>
            
            <div class="blog-img-container">
                <img src="assets/博客文章/分治法求最近点对/other/分治法步骤/step1.png" class="blog-inline-img" alt="划分区间">
                <div class="blog-img-caption">图 1: 算法第一步，寻找中线并进行区域划分</div>
            </div>

            <h3>二、 合并阶段的关键优化：7点检查定理与证明</h3>
            <p>直接在 strip 区域中进行暴力两两比较，其最坏时间复杂度仍然是 $O(N^2)$。分治法之所以高效，得益于合并阶段一个强有力的几何限制性质：</p>
            <p><strong>【7点检查定理】</strong>：对于 strip 区域中按 Y 坐标排序后的任意候选点 $P$，在它上方与它距离可能小于 $d$ 的点，<strong>最多只有 7 个</strong>。因此，在遍历时，我们只需将点 $P$ 与它后面的 7 个点进行距离计算，即可找出所有跨区域的最近点对候选。</p>
            
            <div class="blog-img-container">
                <img src="assets/博客文章/分治法求最近点对/other/检查后7点-证明辅助图.png" class="blog-inline-img" alt="几何证明图">
                <div class="blog-img-caption">图 2: 7点检查定理几何证明网格图</div>
            </div>
            
            <h4>严谨的几何证明：</h4>
            <p>如图 2 所示，考虑分割线两侧宽为 $d$、高为 $d$ 的矩形带状区域 $[mid\\_x - d, mid\\_x + d] \\times [P.y, P.y + d]$。由于 $d$ 是左右子区间各自的最短距离，因此在左半边和右半边内部，任意两点的距离都必然 $\\ge d$。</p>
            <p>我们将这片 $2d \\times d$ 的空间划分为 8 个大小为 $\\frac{d}{2} \\times \\frac{d}{2}$ 的正方形小网格（左侧 4 个，右侧 4 个）。根据鸽巢原理和几何限制：</p>
            <ul>
                <li>由于同一半边的内部两点距离至少为 $d$，而每一个 $\\frac{d}{2} \\times \\frac{d}{2}$ 小正方形的最大对角线距离为 $\\sqrt{(\\frac{d}{2})^2 + (\\frac{d}{2})^2} = \\frac{d}{\\sqrt{2}} \\approx 0.707d < d$。</li>
                <li>因此，<strong>每一个小正方形网格内最多只能容纳 1 个点</strong>。</li>
                <li>除去候选点 $P$ 自身所在的网格（网格5），在该 $2d \\times d$ 矩形内最多只能剩下 7 个小正方形。</li>
                <li>因此，该区域内除了点 $P$ 之外，最多只能存在 7 个点。由于所有这些点的 Y 坐标都在 $P.y$ 到 $P.y + d$ 之间，因此当我们将点按 Y 坐标排序后，只需将每个点与它后面的 7 个点进行比较。</li>
            </ul>

            <div class="blog-img-container">
                <img src="assets/博客文章/分治法求最近点对/other/分治法步骤/step6.png" class="blog-inline-img" alt="按Y排序遍历比较">
                <div class="blog-img-caption">图 3: 按 Y 坐标排序后限制跨区比较节点范围为 7 个</div>
            </div>

            <h3>三、 预处理与复杂度分析</h3>
            <p>如果在每次递归中都对 Y 坐标进行快速排序，整体复杂度会退化为 $O(N \\log^2 N)$。为了确保 $O(N \\log N)$，我们必须在递归外部进行全局的预排序，并在合并阶段使用类似于<strong>归并排序（Merge Sort）</strong>的线性合并策略，在 $O(N)$ 时间内合并 Y 坐标数组。</p>
            
            <div class="blog-img-container">
                <img src="assets/博客文章/分治法求最近点对/other/results_analysis.png" class="blog-inline-img" alt="性能实测曲线">
                <div class="blog-img-caption">图 4: 蛮力法与分治法随点集数 N 增长的实际运行时间对比</div>
            </div>
            
            <p>实测数据表明（图 4），当数据规模 $N$ 达到 100,000 时，暴力求解耗时约 1783 秒（约 30 分钟），而分治法仅需 2.05 秒，加速比达到了惊人的 870 多倍，充分展示了分治法与几何剪枝合并的巨大威力。</p>
        `
    },
    {
        id: 3,
        title: "图像矢量化（Image Vectorization）深度调研报告",
        date: "2026-06-15",
        category: "Research",
        tags: ["SVG", "图像矢量化", "可微渲染", "生成式模型"],
        summary: "本篇重点梳理图像矢量化领域的发展历程与技术迭代。深入剖析传统启发式追踪算法、基于可微渲染的全局参数优化、大模型自回归代码生成、潜在空间扩散等四大主流技术范式，并分析 Amodal 补全与 Bezier Splatting 等前沿破局技术。",
        content: `
            <p>图像矢量化旨在将以离散像素阵列为基础的光栅图像（Raster Images）转化为由几何基元（如多边形、贝塞尔曲线等）组成的无限可缩放矢量图形（SVG）。随着AIGC的爆发，这一领域正经历着从传统启发式追踪向多模态深度学习生成、从“重构像素”向“构建独立可编辑资产”的巨大范式转移。</p>
            
            <h3>一、 技术迭代历程与四大主流范式</h3>
            <p>纵观近三十年来的技术演进，图像矢量化可以划分为以下四个主要的迭代流派：</p>
            
            <h4>1. 传统启发式轮廓追踪法</h4>
            <p>以经典的开源工具 <strong>Potrace</strong> 和 <strong>Autotrace</strong> 为代表。这类算法主要依赖边缘检测、图像二值化以及多边形近似拟合。其运行速度极快，在处理纯色、二值化或轮廓分明的简单标志（Logo）时效果极佳；但在面临复杂彩色照片、光影渐变等自然图像时，由于缺乏对画面的语义理解，往往会生成大量杂乱的碎小图元，丢失高层级的几何结构。</p>
            
            <h4>2. 基于可微渲染的全局参数优化（Differentiable Rendering）</h4>
            <p>随着 <strong>DiffVG</strong> 等可微光栅化器的诞生，图像矢量化进入了全新的反向传播时代。该流派将矢量参数（控制点坐标、填充颜色、透明度）作为可优化的权重，前向渲染得到光栅图像，利用像素级重构损失（或使用 CLIP/SDS 等高维语义特征损失），通过梯度下降不断更新几何基元的参数。典型代表包括 <strong>LIVE</strong> 和 <strong>VectorFusion</strong>。该范式还原度极高，但对拓扑结构的初始设定异常敏感，且由于每步都需要渲染求导，计算速度极其缓慢。</p>
            
            <h4>3. 大语言模型（LLM）自回归代码生成</h4>
            <p>将矢量化抽象为“Seq2Seq”翻译任务。模型（如 <strong>StarVector</strong>）在大量 SVG 代码数据集上进行训练，将复杂的 XML 指令简化为统一的绘图 Token（M, L, C 等），通过自回归机制预测控制点序列。由于缺乏对二维画布的物理感知，此范式存在长序列下“灾难性误差累积”的痛点，容易产生变形、曲线无法闭合的现象。</p>
            
            <h4>4. 潜在空间扩散生成（Latent Space Diffusion）</h4>
            <p>为了克服自回归的累积误差并摆脱优化的慢速，<strong>SVGFusion</strong> 提出在连续的 VAE 潜在空间中进行加噪去噪的扩散生成。通过并行去噪预测出全局的 SVG 潜变量，最后解码输出完整的几何路径。该流派生成速度快，是未来工业级落地的重要方向。</p>

            <h3>二、 支撑矢量生成的基础数据集</h3>
            <p>高质量的矢量数据是深度网络训练的核心。下表归纳了当前研究中主流的数据集组成形式：</p>
            
            <table class="blog-table">
                <thead>
                    <tr>
                        <th>数据集名称</th>
                        <th>数据规模</th>
                        <th>数据组成形式</th>
                        <th>适用任务与典型模型</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>SVG-Icons8 / Fonts</strong></td>
                        <td>10万级 / 1400万</td>
                        <td>纯 SVG 结构化字形/扁平规范图标代码</td>
                        <td>图元层级基础序列生成 (DeepSVG)</td>
                    </tr>
                    <tr>
                        <td><strong>SVG-Hub-1M</strong></td>
                        <td>百万级</td>
                        <td>清洗了几何一致性、无机器追踪伪影的高质量纯矢量</td>
                        <td>高精度自回归与扩散 (DuetSVG)</td>
                    </tr>
                    <tr>
                        <td><strong>MMSVG-2M</strong></td>
                        <td>200万</td>
                        <td>【文本/图像描述 - 规范 SVG 代码】多模态指令对</td>
                        <td>多模态端到端生成 (OmniSVG)</td>
                    </tr>
                    <tr>
                        <td><strong>LayerPeeler Dataset</strong></td>
                        <td>11万~17万</td>
                        <td>【原图像 - SVG代码 - 遮挡深度标注】三元组</td>
                        <td>图层解耦与无模态剥离编辑 (LayerPeeler)</td>
                    </tr>
                </tbody>
            </table>

            <h3>三、最新前沿技术</h3>
            <ul>
                <li><strong>无模态感知与补全（Amodal SVG）</strong>：传统方法只会“见山画山”，将重叠部分的底层裁剪掉。而 AmodalSVG 结合 VLM 的想象力，能将折叠遮挡底部的几何和色彩完整“脑补”还原出来，形成完美可二次拖拽的独立图层。</li>
                <li><strong>贝塞尔泼溅渲染（Bezier Splatting）</strong>：借鉴 3D Gaussian Splatting 的高斯投射思路，将控制点曲线直接向网格“泼溅”光栅化，避免了繁重的求交运算。可微渲染的前反向传播实现了 30~150 倍的巨幅加速，使实时交互式局部参数优化成为可能。</li>
                <li><strong>隐式神经表示（Implicit Neural Representation）</strong>：如 NeuralSVG。用 MLP 的神经网络权重直接拟合局部二维流形场（有向距离场 SDF），不显式存储控制点。在生成后再通过后处理萃取出显式贝塞尔序列，彻底绕开了拓扑自交纠缠问题。</li>
            </ul>
        `
    },
    {
        id: 4,
        title: "图着色问题求解与回溯算法设计及优化",
        date: "2026-06-10",
        category: "Algorithms",
        tags: ["回溯法", "图论", "图着色", "启发式搜索"],
        summary: "本文着重于图着色（Graph Coloring）问题的算法设计与优化。对比经典的朴素回溯搜索（Naive Backtracking）与引入 MRV（最小剩余值值）启发式变量排序及冲突前瞻剪枝的优化回溯算法，并在 DIMACS 基准地图数据集上进行性能评测与密度分析。",
        content: `
            <p>图的 K-着色问题（Graph K-Coloring Problem）是组合优化和图论中的经典 NP-完全问题：给定无向图 $G=(V,E)$ 和颜色数 $K$，需要为每个顶点分配一种颜色，使得任意一条边连接的两个顶点颜色都互不相同。</p>
            
            <h3>一、 朴素回溯算法设计与状态空间</h3>
            <p>朴素回溯算法基于深度优先搜索（DFS）的框架。算法按照固定的顶点顺序（通常为 $1, 2, ..., N$）依次对节点进行染色。对当前节点 $u$，尝试染色 $c \\in [1, K]$：</p>
            <ol>
                <li>遍历节点 $u$ 的邻接链表，判断是否有邻居已染上颜色 $c$；</li>
                <li>若无冲突，则将当前状态标记为 <code>color[u] = c</code>，并递归处理下一个顶点 $u+1$；</li>
                <li>若递归失败，则回溯撤销染色 <code>color[u] = 0</code>，并继续尝试下一种颜色；</li>
                <li>当所有颜色均尝试失败且无法向下进行时，返回 <code>false</code>。</li>
            </ol>
            <p>朴素算法的状态搜索空间呈 $K^N$ 阶数暴涨。由于其染色顺序死板且缺乏前瞻性，一旦在搜索前期做出错误的染色决策，算法将会在深层的局部解空间中进行海量的无意义回溯，产生“雪崩式”回溯爆炸。</p>
            
            <h3>二、 优化回溯算法：启发式搜索与剪枝优化</h3>
            <p>为了在更大规模的无向图（如 DIMACS 评测地图数据）上成功实现四色或多色着色，优化算法从**变量选择顺序（Variable Ordering）**与**前瞻剪枝（Forward Checking）**两个维度进行了重构设计：</p>
            
            <h4>1. MRV（Minimum Remaining Values，最少剩余值）启发式选择</h4>
            <p>不再死板地按编号染色，而是每次优先选择**“最难染色”**的节点。对所有未着色节点，计算其可用颜色的数量（即除去已被邻居占用的颜色后，剩余可选颜色的个数），优先选择剩余可选颜色最少的顶点。这种“最受约束变量优先”的策略可以促使搜索分支尽早发生冲突，使无效的分支在搜索树极浅的层级就触发回溯，极大地缩减了状态搜索空间树的宽度。</p>
            
            <h4>2. 度最大优先（Degree Heuristic）辅助排序</h4>
            <p>如果存在多个节点的 MRV 可选颜色数量相同，我们作为第二关键字，优先选择与未着色邻居相连的边数最多（即度最大）的节点。这能最大程度地限制其余未着色节点的染色空间，加速后续求解过程。</p>
            
            <h4>3. 核心解算器代码片段（C++）</h4>
            <pre><code>// 优化后的回溯求解主框架
bool optimized_dfs(Graph& g, int k, int colored_count, Result& res) {
    if (colored_count == g.n) return true; // 所有顶点着色完毕

    // 1. 通过 MRV 启发式算法寻找最难染色的顶点 u
    int u = select_mrv_vertex(g, res); 
    
    // 2. 局部前瞻与颜色分支试探
    for (int c = 1; c <= k; ++c) {
        if (!is_valid_color(g, u, c, res)) continue;

        res.color[u] = c;
        
        // 递归进入下一层
        if (optimized_dfs(g, k, colored_count + 1, res)) return true;
        
        // 回溯撤销
        res.color[u] = 0;
        res.backtracks++;
    }
    return false;
}</code></pre>

            <h3>三、 基准地图数据测试与性能密度分析</h3>
            <p>在测试中，只使用朴素回溯算法时，面对超过 50 个节点的复杂密集图就会发生明显的卡死或回溯超时；而优化回溯解算器则表现亮眼：</p>
            <ul>
                <li>成功在极短时间内完成了小规模 <code>test.col</code> 地图的四色填涂。</li>
                <li>针对附件中给定的标准大规模 DIMACS 地图数据 <code>le450_*.col</code>（包含 450 个顶点、数万条边），优化回溯法配合 MRV 约束能够在几毫秒至几百毫秒内完成合法着色，完全消除了回溯爆炸。</li>
            </ul>
            <p><strong>图规模与边密度的关系：</strong>实验表明，图着色问题的求解难度并不单纯取决于顶点数 $N$。当边密度（实际边数 / 最大可能边数）处于<strong>相变临界区</strong>（临界密度附近，即图既不是极其稀疏也不是极其稠密时），求解难度最大，回溯次数呈指数级抬升。当密度极稀疏时，约束非常宽松，易于着色；当密度极稠密时，算法能在早期阶段快速判断出“不可着色”，触发硬性剪枝，搜索树同样很小。</p>
        `
    },
    {
        id: 5,
        title: "鸡蛋掉落问题的多重动态规划优化",
        date: "2026-05-15",
        category: "Algorithms",
        tags: ["动态规划", "二分查找", "决策单调性", "空间优化"],
        summary: "鸡蛋掉落问题（Egg Dropping）是动态规划中极具代表性的最优决策问题。本文由浅入深推导标准状态转移方程，进而探讨利用决策单调性进行 $O(\\log F)$ 二分查找优化，以及物理覆盖意义下的逆向动态规划与一维滚动数组优化。",
        content: `
            <p>鸡蛋掉落问题（Egg Dropping Puzzle）是动态规划（Dynamic Programming）中极具代表性的最优决策与最坏情况分析问题。其核心在于：在有限的鸡蛋数 $e$ 和楼层数 $f$ 的硬性约束下，寻求一种确定“门槛楼层”（即鸡蛋开始破碎的临界楼层）所需的<strong>最坏情况下的最少测试次数</strong>。</p>
            
            <h3>一、 标准动态规划方程与状态转移</h3>
            <p>我们定义二维状态 $dp[i][j]$ 表示当前剩余 $i$ 个鸡蛋，需要测试的楼层区间长度为 $j$ 时，确定门槛楼层所需的最少测试次数。</p>
            <p>假设我们选择在第 $k$ 层（$1 \\le k \\le j$）进行第一次投掷尝试，可能会出现两种物理状态分支：</p>
            <ol>
                <li><strong>鸡蛋破碎了</strong>：门槛楼层必然在第 $k$ 层或更低。我们损失一个鸡蛋（剩余 $i-1$ 个），需要测试的下方剩余区间长度缩减为 $k-1$（即 $[1, k-1]$ 范围）。剩余最少测试次数为 $dp[i-1][k-1]$。</li>
                <li><strong>鸡蛋没碎</strong>：门槛楼层必定在第 $k$ 层以上。鸡蛋数量不变（剩余 $i$ 个），需要测试的上方剩余区间长度变为 $j-k$（即 $[k+1, j]$ 范围）。剩余最少测试次数为 $dp[i][j-k]$。</li>
            </ol>
            <p>为了保证在最坏情况下依然能够确定临界层，我们在第 $k$ 层投掷的代价为 $1 + \\max(dp[i-1][k-1], dp[i][j-k])$。为了实现最优策略，需要遍历所有抛掷楼层决策点 $k \\in [1, j]$ 寻找代价最小值。因此状态转移方程为：</p>
            <p class="formula">$$dp[i][j] = 1 + \\min_{1 \\le k \\le j} \\Big( \\max\\big(dp[i-1][k-1], dp[i][j-k]\\big) \\Big)$$</p>
            <p>对于含有 $e$ 个鸡蛋和 $f$ 层楼的问题，标准 DP 自底向上填表的时间复杂度为 $O(e \\cdot f^2)$，因为状态总数为 $e \\cdot f$，而每个状态需要 $O(f)$ 线性扫描决策点 $k$。</p>

            <h3>二、 决策单调性与二分查找优化（Binary Search DP）</h3>
            <p>仔细观察状态转移中两个关于决策点 $k$ 的函数：</p>
            <ul>
                <li>$A(k) = dp[i-1][k-1]$：随着 $k$ 的增加，下方区间长度增大，因此 $A(k)$ 是关于 $k$ 的单调递增函数。</li>
                <li>$B(k) = dp[i][j-k]$：随着 $k$ 的增加，上方未测区间减小，因此 $B(k)$ 是关于 $k$ 的单调递减函数。</li>
            </ul>
            <p>它们的极大值函数 $F(k) = \\max(A(k), B(k))$ 会在递增和递减的交叉点附近取得全局最小值（呈现出 “V” 或 “U” 字形）。基于此决策单调性，我们不再需要线性扫描，而是可以直接通过**二分查找（Binary Search）**在 $O(\\log f)$ 时间内定位两条曲线的交叉点。</p>
            
            <div class="blog-img-container">
                <img src="assets/博客文章/鸡蛋掉落问题/results/binary_search_dp_intuition.svg" class="blog-inline-img" alt="二分优化原理">
                <div class="blog-img-caption">图 1: A(k) 递增与 B(k) 递减在交点处取得最坏情况的最优解</div>
            </div>
            
            <p>这一物理单调性优化将整体填表时间复杂度成功降低至 $O(e \\cdot f \\log f)$。</p>

            <h3>三、 物理覆盖的逆向动态规划（Reverse DP）</h3>
            <p>我们可以转换思考逻辑：<strong>不直接求解给定鸡蛋和楼层时的最少次数，而是求解给定鸡蛋数 $i$ 和允许测试次数 $t$ 时，最大能够覆盖测试的楼层数。</strong></p>
            <p>定义状态 $g[t][i]$ 表示使用 $i$ 个鸡蛋，允许进行 $t$ 次测试时，所能确定的最大楼层跨度：</p>
            <ul>
                <li>如果我们在最佳楼层抛掷一次：</li>
                <li><strong>鸡蛋碎了</strong>：消耗 1 次测试与 1 个鸡蛋。剩余可测的最大跨度为 $g[t-1][i-1]$；</li>
                <li><strong>鸡蛋没碎</strong>：消耗 1 次测试，鸡蛋数不变。上方剩余可测的最大跨度为 $g[t-1][i]$；</li>
                <li>加上进行测试的当前这一层，总覆盖楼层数为：</li>
            </ul>
            <p class="formula">$$g[t][i] = g[t-1][i-1] + g[t-1][i] + 1$$</p>
            <p>这是一个极其精简的线性递推式！为了求原问题，我们只需令 $t$ 从 1 开始递增，当 $g[t][e] \\ge f$ 时，当前的 $t$ 即为所求的最小测试次数。其时间复杂度为完美的 $O(e \\log f)$，空间上由于只依赖于上一轮 $t-1$ 的状态，可以通过**一维滚动数组**进行覆盖更新，使空间复杂度降低至 $O(e)$。</p>
            
            <div class="blog-img-container">
                <img src="assets/博客文章/鸡蛋掉落问题/results/benchmark_plot.png" class="blog-inline-img" alt="基准测试耗时对比">
                <div class="blog-img-caption">图 2: 三种动态规划算法在不同楼层高度下的运行耗时实测对比</div>
            </div>
            
            <p>如图 2 的实测曲线所示，在楼层高度 $F$ 迅速增加时，标准 DP 耗时以平方阶猛增；二分优化 DP 能够支撑中等高度；而逆向数学 DP（Math DP）耗时平缓接近水平线，在极高楼层（如几百万层）下仍能瞬间给出答案。</p>
        `
    }
];

const PROJECT_SHOWCASE = [
    {
        id: 1,
        title: "面向本地论文库的可信溯源学术 AI 助手系统",
        summary: "针对大模型“幻觉”痛点，基于 RAG（检索增强生成）架构和 Python 语言开发。该系统能够对本地海量 PDF 学术论文库进行分块索引与向量化存储，支持自然语言检索与智能问答，并提供精准的可信溯源能力——在回答中自动标出数据来源的具体文档、页码及引用段落原文，保障学术研究可信度。",
        tags: ["RAG", "AI Agent", "Python", "LangChain", "向量数据库"],
        link: "https://github.com/TATATA-box/A-trusted-traceability-academic-AI-assistant-system-for-local-paper-databases/tree/main",
        color: "assets/项目/学术智能体/封面.png" // Path to the custom cover image
    },
    {
        id: 2,
        title: "机械臂抓取仿真与运动规划",
        summary: "基于 ROS2 Humble 与 MoveIt2 物理仿真环境，引入 MoveIt Task Constructor (MTC) 任务构造器，针对桌面三维物体进行抓取任务分解与联合规划。实现了从桌面场景建模、机械臂关节 URDF 模型加载，到‘碰撞检测—姿态规划—爪端夹取—平稳放置’的完整全自动避障路径控制链路。",
        tags: ["ROS2", "MoveIt2", "C++", "Rviz仿真"],
        link: "", // No jump link
        color: "🦾" // Emoji representation
    },
    {
        id: 3,
        title: "智能车自主驾驶控制系统",
        summary: "荣获中国机器人及人工智能大赛机器人应用赛（智能驾驶）全国一等奖作品。基于树莓派硬件与 ROS2 Humble 框架搭建，应用 OpenCV 算法实现实时的自适应车道线边缘检测和中心偏移量计算。配合增量式 PID 控制算法，驱动舵机和电机在沙盘模拟车道中完成高精度的巡线追踪、限速牌标志物识别以及全自动雷达避障控制。",
        tags: ["OpenCV", "Python", "ROS2", "PID 控制", "PID 控制"],
        link: "", // No jump link
        color: "🚗"
    }
];
