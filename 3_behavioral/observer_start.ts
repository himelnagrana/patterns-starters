// TODO: When a user logged-in, display a toast message, fetch permissions and redirect to dashboard
// TODO: When a user logged-out, display a toast message, redirect to login page

// TODO BONUS: When a user logged-in, display the user name in a navbar component (non exist yet)
// TODO BONUS: When a user logged-in, display the user name in a navbar component (non exist yet)

class Publisher<T> {
  private subscribers: Set<Subscriber<T>>;
  private state: T;

  constructor() {
    this.subscribers = new Set();
  }

  subscribe(subscriber: Subscriber<T>) {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber: Subscriber<T>) {
    this.subscribers.delete(subscriber);
  }

  publish(state: T) {
    this.subscribers.forEach(s => s.update(state));
  }
}

class StatefulSubject<T> {
  private subscribers: Set<Subscriber<T>>;
  private state: T;

  constructor(initialState: T) {
    this.state = initialState;
    this.subscribers = new Set();
  }

  subscribe(subscriber: Subscriber<T>) {
    subscriber.update(this.state);
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber: Subscriber<T>) {
    subscriber.update(this.state);
    this.subscribers.delete(subscriber);
  }

  publish(state: T) {
    this.state = state;
    this.subscribers.forEach(s => s.update(state));
  }
}

class Store<T> {
  private listeners: Set<Subscriber<T>>;
  private state: T;
  private reducers: Function;

  constructor(reducer: Function, initialState: T) {
    this.state = initialState;
    this.subscribers = new Set();
    this.reducer = reducer;
  }

  subscribe(subscriber: Subscriber<T>) {
    subscriber.update(this.state);
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber: Subscriber<T>) {
    subscriber.update(this.state);
    this.subscribers.delete(subscriber);
  }

  publish(state: T) {
    this.state = state;
    this.subscribers.forEach(s => s.update(state));
  }
}


/**
 * Responsible for auth logic
 */
class Auth extends StatefulSubject<User> {
  private _currentUser: any;

  constructor() {
    super(null);
    this._currentUser = null;
  }

  get currentUser(): any {
    return this._currentUser;
  }

  signIn() {
    this._currentUser = { name: "Nir" };
    this.publish(this._currentUser);
  }

  signOut() {
    this._currentUser = null;
    this.publish(null);
  }
}

/**
 *  UI for displaying a message on the screen
 */
class ToastMessage implements Subscriber<User> {
  showToast(message: string) {
    console.log("Display toast message: " + message);
  }

  update(state: User) {
    this.showToast(state.name);
  }
}

/**
 * Responsible for fetching a set of permissions for
 * A specific User
 */
class PermissionManager implements Subscriber<User> {
  getPermissionsForUser(user: any) {
    console.log("Fetching permissions for: " + user);
  }

  update(state: User) :void {
    this.getPermissionsForUser(state.name);
  }
}

/**
 * Responsible for routing and redirects
 */
class Router implements Subscriber<User> {
  redirectTo(routeName: string) {
    console.log("Redirectong to: " + routeName);
  }

  update(state: User) {
    if (state.name === 'Nir') {
      this.redirectTo('Admin Panel');
    } else {
      this.redirectTo('User Panel');
    }
  }
}

interface User {
  name: string;
}

interface Subscriber<T> {
  update(state: T): void;
}

interface Observable<T> {
  update(state: T): void;
}

const toast = new ToastMessage();
const permission = new PermissionManager();
const router = new Router();

const authentication = new Auth();

// // if we subscribe before signin it will not work
// authentication.subscribe(toast);
// authentication.subscribe(permission);
// authentication.subscribe(router);
// authentication.signIn();


// to fix the above issue - following is th solution
// either run the last state
// or listen to state variable other than calling publish method 
// using `StatefulSubject`+`Observable` instead of `Publisher`+`Subscriber`

authentication.signIn();

authentication.subscribe(toast);
authentication.subscribe(permission);
authentication.subscribe(router);

//@Note: renaming the StatefulSubject to Store will make it a rough-cut Redux implementation
// like: 

function authReducer(action: any, currentState: any) {
  if (action.type === 'LOGIN') {
    return { user: { name: 'himel' } };
  } else if (action.type === 'LOGOUT') {
    return { user: null };
  }
}

const store = new Store(authReducer, );
