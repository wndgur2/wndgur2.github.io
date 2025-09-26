Chapter 1 Introduction (개관)

1.1 What Operating Systems Do (운영체제가 하는 일)

1.2 Computer-System Organization (컴퓨터 시스템 구성)

1.3 Computer-System Architecture (컴퓨터 시스템 구조)

1.4 Operating-System Operations (운영체제 작업)

1.5 Resource Management (자원 관리)

1.6 Security and Protection (보안 및 보호)

1.7 Virtualization (가상화)

1.8 Distributed Systems (분산 시스템)

1.9 Kernel Data Structures (커널 데이터 구조)

1.10 Computing Environments (컴퓨팅 환경)

1.11 Free and Open-Source Operating Systems (무료 및 오픈 소스 운영체제)

1.12 Summary (요약)

Chapter 2 Operating-System Structures (운영체제 구조)

2.1 Operating-System Services (운영체제 서비스)

2.2 User and Operating-System Interface (사용자 및 운영체제 인터페이스)

2.3 System Calls (시스템 호출)

2.4 System Services (시스템 서비스)

2.5 Linkers and Loaders (링커 및 로더)

2.6 Why Applications Are Operating-System Specific (응용 프로그램이 운영체제에 종속적인 이유)

2.7 Operating-System Design and Implementation (운영체제 설계 및 구현)

2.8 Operating-System Structure (운영체제 구조)

2.9 Building and Booting an Operating System (운영체제 빌드 및 부팅)

2.10 Operating-System Debugging (운영체제 디버깅)

2.11 Summary (요약)

Part Two Process Management (프로세스 관리)

Chapter 3 Processes (프로세스)

3.1 Process Concept (프로세스 개념)

3.2 Process Scheduling (프로세스 스케줄링)

3.3 Operations on Processes (프로세스 작업)

3.4 Interprocess Communication (프로세스 간 통신)

3.5 IPC in Shared-Memory Systems (공유 메모리 시스템에서의 IPC)

3.6 IPC in Message-Passing Systems (메시지 전달 시스템에서의 IPC)

3.7 Examples of IPC Systems (IPC 시스템의 예)

3.8 Communication in Client–Server Systems (클라이언트-서버 시스템에서의 통신)

3.9 Summary (요약)

Chapter 4 Threads & Concurrency (스레드 및 동시성)

4.1 Overview (개요)

4.2 Multicore Programming (멀티코어 프로그래밍)

4.3 Multithreading Models (멀티스레딩 모델)

4.4 Thread Libraries (스레드 라이브러리)

4.5 Implicit Threading (암묵적 스레딩)

4.6 Threading Issues (스레딩 문제)

4.7 Operating-System Examples (운영체제 예)

4.8 Summary (요약)

Chapter 5 CPU Scheduling (CPU 스케줄링)

5.1 Basic Concepts (기본 개념)

5.2 Scheduling Criteria (스케줄링 기준)

5.3 Scheduling Algorithms (스케줄링 알고리즘)

5.4 Thread Scheduling (스레드 스케줄링)

5.5 Multi-Processor Scheduling (멀티 프로세서 스케줄링)

5.6 Real-Time CPU Scheduling (실시간 CPU 스케줄링)

5.7 Operating-System Examples (운영체제 예)

5.8 Algorithm Evaluation (알고리즘 평가)

5.9 Summary (요약)

Part Three Process Synchronization (프로세스 동기화)

Chapter 6 Synchronization Tools (동기화 도구)

6.1 Background (배경)

6.2 The Critical-Section Problem (임계 구역 문제)

6.3 Peterson’s Solution (피터슨의 해결책)

6.4 Hardware Support for Synchronization (동기화를 위한 하드웨어 지원)

6.5 Mutex Locks (뮤텍스 잠금)

6.6 Semaphores (세마포어)

6.7 Monitors (모니터)

6.8 Liveness (활성 상태)

6.9 Evaluation (평가)

6.10 Summary (요약)

Chapter 7 Synchronization Examples (동기화 예)

7.1 Classic Problems of Synchronization (동기화의 고전적 문제)

7.2 Synchronization within the Kernel (커널 내 동기화)

7.3 POSIX Synchronization (POSIX 동기화)

7.4 Synchronization in Java (자바에서의 동기화)

7.5 Alternative Approaches (대체 접근법)

7.6 Summary (요약)

Chapter 8 Deadlocks (교착 상태)

8.1 System Model (시스템 모델)

8.2 Deadlock in Multithreaded Applications (멀티스레드 응용 프로그램에서의 교착 상태)

8.3 Deadlock Characterization (교착 상태 특성)

8.4 Methods for Handling Deadlocks (교착 상태 처리 방법)

8.5 Deadlock Prevention (교착 상태 예방)

8.6 Deadlock Avoidance (교착 상태 회피)

8.7 Deadlock Detection (교착 상태 감지)

8.8 Recovery from Deadlock (교착 상태 복구)

8.9 Summary (요약)

Part Four Memory Management (메모리 관리)

Chapter 9 Main Memory (주 메모리)

9.1 Background (배경)

9.2 Contiguous Memory Allocation (연속 메모리 할당)

9.3 Paging (페이징)

9.4 Structure of the Page Table (페이지 테이블 구조)

9.5 Swapping (스와핑)

9.6 Example: Intel 32- and 64-bit Architectures (예: 인텔 32비트 및 64비트 아키텍처)

9.7 Example: ARMv8 Architecture (예: ARMv8 아키텍처)

9.8 Summary (요약)

Chapter 10 Virtual Memory (가상 메모리)

10.1 Background (배경)

10.2 Demand Paging (요구 페이징)

10.3 Copy-on-Write (쓰기 시 복사)

10.4 Page Replacement (페이지 교체)

10.5 Allocation of Frames (프레임 할당)

10.6 Thrashing (스래싱)

10.7 Memory Compression (메모리 압축)

10.8 Allocating Kernel Memory (커널 메모리 할당)

10.9 Other Considerations (기타 고려 사항)

10.10 Operating-System Examples (운영체제 예)

10.11 Summary (요약)

Part Five Storage Management (스토리지 관리)

Chapter 11 Mass-Storage Structure (대용량 스토리지 구조)

11.1 Overview of Mass-Storage Structure (대용량 스토리지 구조 개요)

11.2 HDD Scheduling (HDD 스케줄링)

11.3 NVM Scheduling (NVM 스케줄링)

11.4 Error Detection and Correction (오류 감지 및 수정)

11.5 Storage Device Management (스토리지 장치 관리)

11.6 Swap-Space Management (스왑 공간 관리)

11.7 Storage Attachment (스토리지 연결)

11.8 RAID Structure (RAID 구조)

11.9 Summary (요약)

Chapter 12 I/O Systems (I/O 시스템)

12.1 Overview (개요)

12.2 I/O Hardware (I/O 하드웨어)

12.3 Application I/O Interface (응용 프로그램 I/O 인터페이스)

12.4 Kernel I/O Subsystem (커널 I/O 서브시스템)

12.5 Transforming I/O Requests to Hardware Operations (I/O 요청을 하드웨어 작업으로 변환)

12.6 STREAMS (스트림)

12.7 Performance (성능)

12.8 Summary (요약)

Part Six File System (파일 시스템)

Chapter 13 File-System Interface (파일 시스템 인터페이스)

13.1 File Concept (파일 개념)

13.2 Access Methods (접근 방법)

13.3 Directory Structure (디렉터리 구조)

13.4 Protection (보호)

13.5 Memory-Mapped Files (메모리 매핑 파일)

13.6 Summary (요약)

Chapter 14 File-System Implementation (파일 시스템 구현)

14.1 File-System Structure (파일 시스템 구조)

14.2 File-System Operations (파일 시스템 작업)

14.3 Directory Implementation (디렉터리 구현)

14.4 Allocation Methods (할당 방법)

14.5 Free-Space Management (여유 공간 관리)

14.6 Efficiency and Performance (효율성 및 성능)

14.7 Recovery (복구)

14.8 Example: The WAFL File System (예: WAFL 파일 시스템)

14.9 Summary (요약)

Chapter 15 File-System Internals (파일 시스템 내부)

15.1 File Systems (파일 시스템)

15.2 File-System Mounting (파일 시스템 마운팅)

15.3 Partitions and Mounting (파티션 및 마운팅)

15.4 File Sharing (파일 공유)

15.5 Virtual File Systems (가상 파일 시스템)

15.6 Remote File Systems (원격 파일 시스템)

15.7 Consistency Semantics (일관성 의미론)

15.8 NFS (NFS)

15.9 Summary (요약)

Part Seven Security and Protection (보안 및 보호)

Chapter 16 Security (보안)

16.1 The Security Problem (보안 문제)

16.2 Program Threats (프로그램 위협)

16.3 System and Network Threats (시스템 및 네트워크 위협)

16.4 Cryptography as a Security Tool (보안 도구로서의 암호화)

16.5 User Authentication (사용자 인증)

16.6 Implementing Security Defenses (보안 방어 구현)

16.7 An Example: Windows 10 (예: 윈도우 10)

16.8 Summary (요약)

Chapter 17 Protection (보호)

17.1 Goals of Protection (보호 목표)

17.2 Principles of Protection (보호 원칙)

17.3 Protection Rings (보호 링)

17.4 Domain of Protection (보호 도메인)

17.5 Access Matrix (접근 행렬)

17.6 Implementation of the Access Matrix (접근 행렬 구현)

17.7 Revocation of Access Rights (접근 권한 취소)

17.8 Role-Based Access Control (역할 기반 접근 제어)

17.9 Mandatory Access Control (MAC) (강제 접근 제어 (MAC))

17.10 Capability-Based Systems (능력 기반 시스템)

17.11 Other Protection Improvement Methods (기타 보호 개선 방법)

17.12 Language-Based Protection (언어 기반 보호)

17.13 Summary (요약)

Part Eight Advanced Topics (고급 주제)

Chapter 18 Virtual Machines (가상 머신)

18.1 Overview (개요)

18.2 History (역사)

18.3 Benefits and Features (이점 및 기능)

18.4 Building Blocks (구성 요소)

18.5 Types of VMs and Their Implementations (VM의 유형 및 구현)

18.6 Virtualization and Operating-System Components (가상화 및 운영체제 구성 요소)

18.7 Examples (예)

18.8 Virtualization Research (가상화 연구)

18.9 Summary (요약)

Chapter 19 Networks and Distributed Systems (네트워크 및 분산 시스템)

19.1 Advantages of Distributed Systems (분산 시스템의 장점)

19.2 Network Structure (네트워크 구조)

19.3 Communication Structure (통신 구조)

19.4 Network and Distributed Operating Systems (네트워크 및 분산 운영체제)

19.5 Design Issues in Distributed Systems (분산 시스템의 설계 문제)

19.6 Distributed File Systems (분산 파일 시스템)

19.7 DFS Naming and Transparency (DFS 명명 및 투명성)

19.8 Remote File Access (원격 파일 접근)

19.9 Final Thoughts on Distributed File Systems (분산 파일 시스템에 대한 최종 생각)

19.10 Summary (요약)