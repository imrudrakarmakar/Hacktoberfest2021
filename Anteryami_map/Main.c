#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#define n 7
#define m 20

/*About Anteryami Map:
 This Application is about the Google Map Working.It's use Graph Data Structure to find the Way(Path) Between
 Two Locations.*/

typedef struct node
{
    int data;
    struct node *next;
} ListNode;

//Globle Variable........................
ListNode *Queue = NULL;
int Graph[n][n];
char place[n][m];

//Queue Function........................
int isEmpty();
void add(int data);
int poll();

//helper function.................
void fill(int *arr, int fill_number);
void print_Array();
void pattern();

//Graph Function.........................
void Get_Graph(char *name);
void Get_PlaceArray(char *name);
void fill_Graph(int a[n][n]);
void fill_Graph_place(char a[n][m]);
int find_Index(char *find_palce);

void Find_shortest_Path(char *sources, char *destiny);
int is_min(int *dist,int tem,int i);

void Is_Path_Exist(char *sources, char *destiny);
int DFS(int start, int end, int visited[]);

void Find_path();

/*We require Queue Data Structure to Implement the BSF.So ,IsEmpty(),Add(data) and Poll() Function are
 use to Implement the Queue. Hear we Implement the Queue With the help of LinkedList Data Structure.*/

int isEmpty()
{
    if (Queue == NULL)
    {
        return 1;
    }
    return 0;
}

void add(int data)
{
    ListNode *toadd = (ListNode *)malloc(sizeof(ListNode));
    toadd->data = data;
    toadd->next = NULL;
    if (isEmpty())
    {
        Queue = toadd;
    }
    else
    {
        ListNode *tem = Queue;
        while (tem->next != NULL)
        {
            tem = tem->next;
        }
        tem->next = toadd;
    }
}

int poll()
{
    if(Queue==NULL){
        return -1;
    }
    int ans = Queue->data;
    ListNode *tem = Queue;
    Queue = Queue->next;
    free(tem);
    return ans;
}


/*Find_Index(), Fill(), fill_Graph(), Fill_Graph_place(), Pattern(),print_Array() are some halper function whice use
by other main functions.*/


int find_Index(char *find_place)
{
    for (int i = 0; i < n; i++)
    {
        if (strcmp(place[i], find_place) == 0)
        {
            return i;
        }
    }
    return -1;
}

void fill(int *arr, int fill_number)
{
    for (int i = 0; i < n; i++)
    {
        arr[i] = fill_number;
    }
}

void fill_Graph(int a[n][n])
{
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            Graph[i][j] = a[i][j];
        }
    }
}

void fill_Graph_place(char a[n][20])
{
    for (int i = 0; i < n; i++)
    {
        strcpy(place[i], a[i]);
    }
}

void pattern()
{
    for (int i = 0; i < 130; i++)
    {
        printf("%c", -2);
    }
    printf("\n");
}

void print_Array()
{
    printf("\nList of States are given Below:\n");
    for (int i = 0; i < n; i++)
    {
        printf("-->%s\n", place[i]);
    }
    printf("\n");
}
/*
Dijkstra's algorithm creates a tree of shortest paths from the starting vertex,
the source, to all other points in the graph. So, we use this algorithm to find sorted path in grap.
Why Not BFS?
  10    2
1----2------3
| 9     2   |
|-----4-----|
if we see as BFS we get 1->2->3 sort path with 12 value but if we see 1->4>->3 path which has value 11.
because of this reson we donot use BFS only.
*/

void Find_shortest_Path(char *sources, char *destiny)
{

    int start = find_Index(sources);
    int end = find_Index(destiny);

    if (start == -1 || end == -1)
    {
        printf("No, there is no way to Go %s to %s\n",start,end);
        return;
    }

    int parent[n];
    fill(parent, -1);
    int visited[n];
    fill(visited, 0);
    int dist[n];
    fill(dist,0);

    add(start);

    while (!isEmpty())
    {
        int tem = poll();
        visited[tem] = 1;

        for (int i = 0; i < n; i++)
        {
            if (Graph[tem][i] !=0  && !visited[i])
            {
                if(is_min(dist,tem,i)){
                    dist[i]=dist[tem]+Graph[tem][i];
                    parent[i] = tem;
                }
                add(i);
            }
        }
    }

    int current = end;
    while (parent[current] != -1)
    {
        printf("%s-> ", place[current]);
        current = parent[current];
    }
    printf("%s ==>%dkm distance to reach<==\n", place[start], dist[end]);
}

int is_min(int *dist,int tem,int i){
    if(dist[i]==0) return 1;

    if(dist[i]>dist[tem]+Graph[tem][i]) return 1;

    return 0;

}

/*DFS Traversal of Graph is tell is there is path between point 1 to point 2. Same Concept we use to tell user
 is there is path exist between two given Location.Is_Path_Exist() Function is using DFS() Function for find Path.*/

void Is_Path_Exist(char *sources, char *destiny)
{

    int start = find_Index(sources);
    int end = find_Index(destiny);

    if (start == -1 || end == -1)
    {
        printf("\nNo, there is no way to Go %s to %s\n\n", sources, destiny);
        return;
    }

    int visited[n];
    fill(visited, 0);

    int ans = DFS(start, end, visited);

    if (ans == 1)
    {
        printf("\nYes there the way to Go %s to %s\n\n", sources, destiny);
    }
    else
    {
        printf("\nNo, there is no way to Go %s to %s\n\n", sources, destiny);
    }
}

int DFS(int start, int end, int *visited)
{
    if (start == end)
        return 1;
    visited[start] = 1;
    int tem = start;
    for (int i = 0; i < n; i++)
    {
        if (Graph[tem][i] != 0 && visited[i] != 1)
        {
            visited[i] = 1;
            int ans = DFS(i, end, visited);
            if (ans == 1)
                return 1;
        }
    }
    return 0;
}


/*Find_Path() is one of the important function of Application. Find_Path() Take Input form user and give the path
 between to location with the help of BFS() function. And also tolad is there is path between to location with
 the help of In_Path_Exites() Function*/
void Find_path()
{
    print_Array();
    char start[m], end[m];
    printf("Enter Your Current Position:\n");
    scanf("%s", start);
    printf("Enter Your Destination where you want to reach:\n");
    scanf("%s", end);
    int choice;
    while (1)
    {
        printf("1.ENTER 1 if you want to know Path exist from %s to %s:\n", start, end);
        printf("2.ENTER 2 for Know the shorted path between %s to %s:\n", start, end);
        printf("3.ENTER 3 For Exit:\n");
        scanf("%d", &choice);
        if (choice == 1)
        {
            Is_Path_Exist(start, end);
        }
        else if (choice == 2)
        {
            Find_shortest_Path(end, start);
        }
        else
        {
            break;
        }
    }
    printf("Enter 1 for start the journey: else any key for Exit:\n");
    scanf("%d", &choice);
    if (choice == 1)
    {
        printf("Enter 1 is you reach your location:\n");
        scanf("%d", &choice);
    }
    printf("\n***Thank You***\n");
}




int main()
{
    int Enter;
    pattern();
    printf("\t\t\t\t\t-:WELCOME TO ANTERYAMI MAP SYSTEM:-\n");
    pattern();
    printf("\nEnter 1 For Start the app:");
    scanf("%d", &Enter);
    while (Enter)
    {
        printf("1.Enter 1 for Search Path between two states in India:\n");
        printf("2.Enter 2 for Search Path between two District from any Indian state:\n");
        printf("3.Enter 3 for Exit:\n");
        scanf("%d", &Enter);

        if (Enter == 1)
        {
            Get_Graph("India");
            Get_PlaceArray("India");
            Find_path();
        }
        else if (Enter == 2)
        {
            while (1)
            {
            int choice;
            printf("Give us your Current position.(Enter Number only):\n");
            printf("1:-Gujarat\n");
            printf("2:-Goa\n");
            printf("3:-UP\n");
            printf("4:-Maharashtra\n");
            printf("5:-Rajasthan\n");
            printf("6:-Punjab\n");
            printf("7:-Uttarakhand\n");
            scanf("%d", &choice);
            char place_user[m];
            if (choice == 1)
            {
                strcpy(place_user, "Gujarat");
            }
            else if (choice == 2)
            {
                strcpy(place_user, "Goa");
            }
            else if (choice == 3)
            {
                strcpy(place_user, "UP");
            }
            else if (choice == 4)
            {
                strcpy(place_user, "Maharashtra");
            }
            else if (choice == 5)
            {
                strcpy(place_user, "Rajasthan");
            }
            else if (choice == 6)
            {
                strcpy(place_user, "Punjab");
            }
            else if(choice == 7)
            {
                strcpy(place_user, "Uttarakhand");
            }
            else{
                printf("Enter Again:-->\n");
                choice=-1;
            }
            if(choice!=-1){
            Get_Graph(place_user);
            Get_PlaceArray(place_user);
            Find_path();
            break;
            }
            }
        }
        else
        {
            break;
        }
    }
    printf("\n***Thank You***\n");
}

/* Get_Graph() and Get_PlaceArray Are two Data base of Anteryami Map. Get_Graph Function will return the Main Graph
 of Given area and Get_PlaceArray() give the Locations name of Area or graph */
void Get_Graph(char *name)
{

    if (strcmp(name, "India") == 0)
    {
        int a[n][n] = {{0, 735, 0, 0, 0, 710, 0},
                       {735, 0, 566, 704, 427, 0, 0},
                       {0, 566, 0, 0, 0, 0, 0},
                       {0, 704, 0, 0, 524, 0, 0},
                       {0, 427, 0, 524, 0, 0, 0},
                       {710,0, 0, 0, 0, 0, 583},
                       {0, 0, 0, 0, 0, 583, 0}};
        fill_Graph(a);
    }
    else if (strcmp(name, "Gujarat") == 0)
    {
        int a[n][n] = {{0, 80, 0, 0, 0, 710, 0},
                       {80, 0, 0, 117, 159, 319, 0},
                       {0, 0, 0, 76, 0, 0, 0},
                       {0, 117, 76, 0, 0, 0, 26},
                       {0, 159, 0, 0, 0, 362, 0},
                       {0,319, 0, 0, 362, 0, 0},
                       {0, 0, 0, 26, 0, 0, 0}};
        fill_Graph(a);
    }
    else if (strcmp(name, "Goa") == 0)
    {
        int a[n][n] = {{0, 0, 0, 0, 0, 0, 30},
                       {0, 0, 21, 0, 13, 0, 0},
                       {0, 21, 0, 0, 0, 31, 24},
                       {0, 0, 0, 0, 33, 0, 0},
                       {0, 13, 0, 33, 0, 0, 0},
                       {0,0, 31, 0, 0, 0, 0},
                       {30, 0, 24, 0, 0, 0, 0}};
        fill_Graph(a);
    }
    else if (strcmp(name, "UP") == 0)
    {
         int a[n][n] = {{0, 110, 63, 0, 0, 0, 30},
                       {110, 0, 118, 189, 63, 139, 106},
                       {63, 118, 0, 0, 0, 43, 0},
                       {0, 189, 0, 0, 0, 0, 0},
                       {0, 63, 0, 0, 0, 0, 0},
                       {0,139, 43, 0, 0, 0, 65},
                       {0, 106, 0, 0, 0, 65, 0}};
        fill_Graph(a);
    }
    else if (strcmp(name, "Maharashtra") == 0)
    {
         int a[n][n] = {{0, 112, 149, 121, 0, 0, 0},
                       {112, 0, 0, 0, 122, 0, 0},
                       {149, 0, 0, 0, 0, 148, 22},
                       {121, 0, 0, 0, 0, 163, 0},
                       {0, 122, 0, 0, 0, 0, 0},
                       {0,0, 148, 163, 0, 0, 0},
                       {0, 0, 22, 0, 0, 0, 0}};
        fill_Graph(a);
    }
    else if (strcmp(name, "Rajasthan") == 0)
    {
         int a[n][n] = {{0, 124, 324, 242, 0, 0, 0},
                       {124, 0, 0, 143, 208, 234, 153},
                       {324, 0, 0, 0, 0, 43, 0},
                       {242, 143, 281, 0, 66, 0, 0},
                       {0, 208, 0, 66, 0, 0, 168},
                       {0,234, 0, 66, 0, 0, 130},
                       {0, 153, 0, 0, 168, 130, 0}};
        fill_Graph(a);
    }
    else if (strcmp(name, "Uttarakhand") == 0)
    {
         int a[n][n] = {{0, 0, 0, 0,153, 64,0},
                       {0, 0, 158, 0, 0, 268, 107},
                       {0,158 , 0, 169, 0, 0, 94},
                       {0, 0, 169, 0, 0, 73, 0},
                       {153, 0, 0, 0, 0, 130, 0},
                       {64,268, 0, 73, 130, 0, 0},
                       {0, 107, 94, 0, 0, 0, 0}};
        fill_Graph(a);
    }
    else if (strcmp(name, "Punjab") == 0)
    {
         int a[n][n]= {{0, 94, 0,45,58, 0,82},
                       {94, 0, 0, 0, 0, 0, 0},
                       {0,0, 0, 0, 122, 112, 0},
                       {45, 0, 122, 0, 17, 0, 0},
                       {58, 0, 122, 17, 0, 68, 96},
                       {0,0, 0, 0, 68, 0, 73},
                       {82, 0, 0, 0, 96, 73, 0}};
        fill_Graph(a);
    }
}
void Get_PlaceArray(char *name)
{

    if (strcmp(name, "India") == 0)
    {
        char a[n][m] = {"Gujarat", "Rajasthan", "Punjab", "UP","Dehli","Maharashtra","Goa"};
        fill_Graph_place(a);
    }
    else if (strcmp(name, "Gujarat") == 0)
    {
        char a[n][m]  = {"Rajkot", "Surendranagar", "Anand", "Ahmedabad","Patan","Kutch","Gandhinagar"};
        fill_Graph_place(a);
    }
    else if (strcmp(name, "Goa") == 0)
    {
        char a[n][m]  = {"Bardez", "Salette", "Ponda", "Canocona","Quepem","Sattari","TisWadi"};
        fill_Graph_place(a);
    }
    else if (strcmp(name, "UP") == 0)
    {
        char a[n][m]  = {"Luknow", "Hardoi", "Unnao", "Farrukhabad","Shanjanpur","Kanpur_Nager","Kanput_Dehat"};
        fill_Graph_place(a);
    }
    else if (strcmp(name, "Maharashtra") == 0)
    {
        char a[n][m]  = {"Pune", "Satara", "Thane", "Ahemadnager","Kolhapur","Nashik","Mumbai"};
        fill_Graph_place(a);
    }
    else if (strcmp(name, "Rajasthan") == 0)
    {
        char a[n][m]  = {"Bikaner", "Nagur", "Jaislmer", "Jodhapur","Pali","Jaipur","Ajmer"};
        fill_Graph_place(a);
    }
    else if (strcmp(name, "Punjab") == 0)
    {
         char a[n][m]  = {"Hoshiarpur", "Rupnagar", "Firozpur", "Jalandhar","Kapurthala","Amristar","Gurdaspur"};
        fill_Graph_place(a);
    }
    else if (strcmp(name, "Uttarakhand") == 0)
    {
        char a[n][m]  = {"Nainital", "Pauri", "Chamoli", "Bagshwar","Champttwat","Almora","Rudraprayag"};
        fill_Graph_place(a);
    }
}
