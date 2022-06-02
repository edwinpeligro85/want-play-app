import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthState } from '@app/auth/state';
import { PostModel } from '@app/modules/post/post.model';
import { Posts, PostsState } from '@app/modules/post/state';
import { UserModel } from '@app/modules/user/user.model';
import { Select, Store } from '@ngxs/store';
import { StateReset } from 'ngxs-reset-plugin';
import { filter, Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@shared';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @Select(PostsState.posts) posts$!: Observable<PostModel[]>;
  @Select(PostsState.loading) loading$!: Observable<boolean>;

  public user: UserModel | null = null;

  public courts = [
    {
      logo: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.6435-9/78631745_742271169627213_7429559863140679680_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=xlETuHXW8S0AX9yEXUl&_nc_ht=scontent.feoh3-1.fna&oh=00_AT-B3DKq32dbTehqgN2UWqaD-C6cjlwZqvVBfpjgRKGkcw&oe=62B594A8',
      pic: 'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.6435-9/34605338_375646796289654_209685435876638720_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=vybSFJO4uDcAX97wCSf&_nc_ht=scontent.feoh3-1.fna&oh=00_AT80e2XvGqZNqd6aZa-nEoewyhG4uvmf3G7D7IZ6vqbSNA&oe=62B88C4E',
      title: 'Canaán - Canchas Sintéticas',
      phone: '56553280498',
      address: 'Via Armenia, Pereira, Risaralda',
      hours: '',
    },
    {
      pic: 'https://scontent.feoh4-3.fna.fbcdn.net/v/t1.6435-9/139432085_106256398125486_8409012025388791091_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=106&ccb=1-7&_nc_sid=dd9801&_nc_ohc=g_ZZIUqgzFAAX_rCO9h&_nc_ht=scontent.feoh4-3.fna&oh=00_AT8xUT3Z6M94rYzODqn8mJGqCTCwQ6X7r4FQ_s0YVP-sGg&oe=62BD6839',
      logo: 'https://scontent.feoh4-4.fna.fbcdn.net/v/t1.6435-9/139241485_106212948129831_3180980913550362167_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=110&ccb=1-7&_nc_sid=85a577&_nc_ohc=YlKURUqzeGgAX9MSrTG&_nc_ht=scontent.feoh4-4.fna&oh=00_AT8ELaDdlv7jsehGLpAmOL61vO-bYojSyXyOAcZ1iXnIbw&oe=62BE7486',
      hours: '9:00 am A 11:50 pm',
      title: 'Bernabeu',
      phone: '573212607773',
      address: 'Carrera 31 Calle 72 Lote Antigua Habana 2 Cuba, Pereira, Risaralda',
    },
    {
      pic: 'https://img.restaurantguru.com/r862-SportCenter-La-Villa-exterior.jpg',
      logo: 'https://pbs.twimg.com/profile_images/1466030286458740737/1QJru6Qn_400x400.jpg',
      hours: '7:00 am A 11:00 pm',
      title: 'Sport Center',
      phone: '573041190613',
      address: 'Cl. 94 #15-80, Pereira, Risaralda',
    },
    {
      pic: 'https://scontent.feoh4-4.fna.fbcdn.net/v/t1.6435-9/78337862_133988204685640_544049103726706688_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=973b4a&_nc_ohc=KRiW1jiKkboAX8CSCHH&_nc_ht=scontent.feoh4-4.fna&oh=00_AT_BmSKp2ukUWGUeA7vsGBP54Fz6ZpJV1UyBORGfrW59_g&oe=62BC69A0',
      logo: 'https://scontent.feoh4-3.fna.fbcdn.net/v/t1.6435-9/85127556_169805787770548_6278581479047954432_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=973b4a&_nc_ohc=31gl4YGmyjcAX_2DI3e&_nc_ht=scontent.feoh4-3.fna&oh=00_AT8xDUvRkHIxLZLK6DH4Tqpihq6URa5GXtx0BS6CVRdOmg&oe=62BDC2F2',
      hours: '8:00 am A 11:00 pm',
      title: 'Vista Hermosa',
      phone: '573103961995',
      address: 'Finca Vista Hermosa, Pereira-Vereda El Estanquillo, Dosquebradas, Risaralda',
    },
  ];

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(AuthState.user)
      .pipe(
        filter((user) => !!user),
        untilDestroyed(this)
      )
      .subscribe((user) => {
        this.user = user;

        this.store.dispatch(new Posts.SetFilter(JSON.stringify({ city: { $eq: user?.profile.city?._id } })));
        this.loadPosts();
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StateReset(PostsState));
  }

  onScroll() {
    const totalItems = this.store.selectSnapshot(PostsState.totalItems);
    const totalResult = this.store.selectSnapshot(PostsState.totalResult);

    if (totalItems < totalResult) {
      this.loadPosts();
    }
  }

  private loadPosts(): void {
    this.store.dispatch(new Posts.FetchAll({ sort: '-created_at' }));
  }
}
